let bodyParser = require('body-parser');
let mysql = require('mysql');
let moment = require('moment');
let fs = require('fs');
let json2csv = require('json2csv');
let csv = require('csv-array');

//  export
module.exports = function(app){

    //  look for http request, parse out json from http request
    app.use(bodyParser.json());
    //  make sure that this api can handle url requests
    app.use(bodyParser.urlencoded({ extended: true }));

    //  for date issues format
    Date.prototype.toJSON = function() {
    return moment(this).format("YYYY-MM-DD");
    }

    //  mysql connection via connection pooling ( I think it's better than creating new connections everytime )
    //  using the db credentials 
    //  change this create a dbconfig later
    //  need to encrypt this.
    let pool = mysql.createPool({
        multipleStatements: true,
        connectionLimit:    100, //try for now :))
        host    :           'ddolfsb30gea9k.c36ugxkfyi6r.us-west-2.rds.amazonaws.com',
        user    :           'fab4_engineers',
        password:           'Password123',
        database:           'fab4'
    });    


    let poolLocal = mysql.createPool({
        multipleStatements: true,
        connectionLimit:    100, //try for now :))
        host    :           'localhost',
        user    :           'root',
        password:           '2qhls34r',
        database:           'dbtarget'
        }); 

    let poolLocalSups = mysql.createPool({
        connectionLimit: 100,
        host:   'localhost',
        user:   'root',
        password:   '2qhls34r',
        database:   'dbsups'
    });
        
    //  today today today
    let today = new Date();
    let todayPlus = moment();
    let todayMinus = moment();
    let dateAndtime = new Date();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        //  for am shift, and pm to midnight and midnight to am
        today = yyyy + '-' + mm + '-' + dd;
        todayPlusOne = moment(todayPlus).add(1, 'days').format('YYYY-MM-DD');
        todayMinusOne = moment(todayMinus).subtract(1, 'days').format('YYYY-MM-DD');

        dateAndtime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;

        
        let date_time = moment(dateAndtime, "YYYY-MM-DD h:mm:ss");
        
        //  let use for checking AM and PM
        //  using momentjs 
        let checker = moment(dateAndtime, "YYYY-MM-DD h:mm:ss");
        let check_am_start = moment(today + " " + "06:30:00", "YYYY-MM-DD h:mm:ss");
        let check_am_end = moment(today + " " + "18:29:59", "YYYY-MM-DD h:mm:ss");    
        
        let check_pm_start = moment(today + " " + "18:30:00", "YYYY-MM-DD h:mm:ss");
        let check_notyet_midnight = moment(today + " " + "23:59:59", "YYYY-MM-DD h:mm:ss");   
        let check_exact_midnight = moment(today + " " + "00:00:00", "YYYY-MM-DD h:mm:ss");    
        let check_pm_end = moment(today + " " + "06:29:59", "YYYY-MM-DD h:mm:ss" );


    // login validation
    app.post('/login/sups/validate', function(req, res){

        poolLocalSups.getConnection(function(err, connection){

            if(req.body.employee_id){

                connection.query({
                    sql: 'SELECT employee_id, sup_password FROM tbl_sups_details WHERE employee_id = ?',
                    values: [req.body.employee_id]
                },  function(err, results, fields){
    
                        let obj = [];
    
                            for(let i=0;i<results.length;i++){
                                obj.push({
                                    employee_id: results[i].employee_id,
                                    sup_lastname: results[i].sup_lastname,
                                    sup_firstname: results[i].sup_firstname,
                                    sup_password: results[i].sup_password
                                });
                            }
    
                            if(obj.length > 0){

                                if(obj[0].sup_password==req.body.password){
                                    
                                    req.session.employee_id = req.body.employee_id;
                                    req.session.sup_firstname = obj[0].sup_firstname;
                                    
                                    let logs = {employee_id: obj[0].employee_id, log_details: 'login', log_date_time: dateAndtime};
                                    
                                    connection.query('INSERT INTO tbl_sups_logs SET ?', logs,  function(err, results, fields){
                                        console.log(logs);
                                        res.send('ok');
                                    });

                                }else{
                                    res.send('ID number or password does not exist');
                                }
    
                            }else{
                                res.send('ID number or password does not exist');
                            }
    
                    });

            }else{

                console.log('error ' + req.body.employee_id);
            }

        });


    });

    app.get('/logout', function (req, res) {

            poolLocalSups.getConnection(function(err, connection){

                let logs = {employee_id: req.session.employee_id, log_details: 'logout', log_date_time: dateAndtime};

                connection.query('INSERT INTO tbl_sups_logs SET ?', logs,  function(err, results, fields){  
                    console.log(logs);
                });
                
                delete req.session.employee_id;
                res.redirect('/');
                
            });

      }); 

    // ALL tools with target outs and variance
    app.get('/all', function(req, res){

        let allTargetPromise = new Promise (function(resolve, reject){

            csv.parseCSV('./public/target/process_target.csv', function(data){

                let allTarget = [];

                    for(let i=0;i<data.length;i++){

                        allTarget.push({
                            process_name: data[i].process_name,
                            process_target: parseInt(data[i].t_target)
                        });
                    }
                
                resolve({target: allTarget});
                //res.send({alltarget: allTarget});

            });

        });

        let allOutsPromise = new Promise (function(resolve, reject){

            csv.parseCSV('./public/outs/process_outs.csv', function(data){

                let allOuts = [];

                    for(let i=0;i<data.length;i++){

                        allOuts.push({
                            process_name: data[i].process_id,
                            process_outs: parseInt(data[i].totalOuts)
                        });

                    }
                
                resolve({outs: allOuts});
                //res.send({outs: allOuts});

            });

        });

        Promise.all([allTargetPromise, allOutsPromise]).then(function(values){

            let data = values;

                //  subtract to get the variance
                var allData = [];

                    for(let i=0;i<data[0]['target'].length;i++){

                        if(data[0]['target'][i]['process_target'] !== null){
                            var eachTarget = data[0]['target'][i]['process_target'].toLocaleString(undefined, {maximumFractionDigits: 0});
                        }else{
                            var eachtarget = 0;
                        }

                        if(data[1]['outs'][i]['process_outs'] !== null){
                            var eachOuts = data[1]['outs'][i]['process_outs'].toLocaleString(undefined, {maximumFractionDigits: 0});                  
                        }else{
                            var eachOuts = 0;
                        }

                        if(data[0]['target'][i]['process_target'] >= data[1]['outs'][i]['process_outs']){
                            if(data[0]['target'][i]['process_target'] !== null && data[1]['outs'][i]['process_outs'] !== null){
                                var eachVariance = '- ' + (data[0]['target'][i]['process_target'] - data[1]['outs'][i]['process_outs']).toLocaleString(undefined, {maximumFractionDigits: 0});
                            }else{
                                var eachVariance = 0;
                            }
                        }else{
                            if(data[0]['target'][i]['process_target'] !== null && data[1]['outs'][i]['process_outs'] !== null){
                                var eachVariance = '+ ' + (data[1]['outs'][i]['process_outs'] - data[0]['target'][i]['process_target']).toLocaleString(undefined, {maximumFractionDigits: 0});
                            }else{
                                var eachVariance = 0;
                            }

                        }
                            
                        allData.push({
                            process_name:   data[0]['target'][i]['process_name'],
                            process_target: eachTarget,
                            process_outs: eachOuts,
                            variance: eachVariance
                        });
                    }

                //console.log(data[1]['outs'][0]['process_outs']);
                //console.log(allData);
                res.render('all', {allData});

        });

    });

    // http request hourly outs per process
    app.get('/hourly/:process_url', function(req, res){
        //  parse process url
        let process = req.params.process_url;   
    
        // promise 1
        let hourlyTargetPromise = new Promise (function(resolve, reject){
        /*
        if (checker >= check_am_start && checker <= check_am_end) {
            //  local database
            poolLocal.getConnection(function(err, connection){
        
                //  will check the AM and PM 
                console.log("am-shift");
                //  query
                connection.query({
                    sql: 'SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "06:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = ?',
                    //SELECT process_id, process_name, SUM(total_target) AS t_target FROM view_target WHERE     stime >= "06:30:00" AND today_date = CURDATE() AND     stime <= CURTIME() - INTERVAL 10 MINUTE AND  process_name = ?
                    values: [process]
                    },  function(err, results, fields){
                        if (err) return reject(err);

                            let processTarget = [];

                            processTarget.push(
                                results[0].t_target
                            );                 

                    resolve({processTarget: processTarget});
                });
            });

        }else {
            //  pm shift
            //  dont forget the 00:00:00 if statement
            //  query
                if (checker >= check_pm_start && checker <= check_notyet_midnight) {

                    //  local database
                    poolLocal.getConnection(function(err, connection){
                            
                            console.log("PM- MID shift");
                            connection.query({
                            sql: 'SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = ?',
                            //'SELECT process_id, process_name, SUM(total_target) AS t_target FROM view_target WHERE     stime >= "18:30:00" AND today_date = CURDATE() AND     stime <= CURTIME() - INTERVAL 10 MINUTE AND  process_name = ?',
                            values: [process]
                                },  function(err, results, fields){
                                    if (err) return reject(err);

                                    let processTarget = [];
                                        processTarget.push(
                                            results[0].t_target
                                        );                 

                                    resolve({processTarget: processTarget});
                                    
                            });
                        
                    });

                } else if (checker >= check_exact_midnight && checker <= check_pm_end) {
                            console.log("MID-AM shift");
                            //  local database
                            poolLocal.getConnection(function(err, connection){

                                    connection.query({
                                    sql: 'SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = ?) A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = ?) B  ON A.process_id = B.process_id )',
                                    //'SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(total_target) AS t_target  FROM view_target  WHERE    stime >= "18:30:00"  AND   today_date = CURDATE() - INTERVAL 1 DAY  AND   process_name = ?) A  JOIN (SELECT process_id, process_name, SUM(total_target) AS t_target   FROM view_target   WHERE     stime >= "00:00:00"   AND  stime <= CURTIME() - INTERVAL 10 MINUTE   AND   process_name = ?) B  ON A.process_id = B.process_id )',
                                    values: [process, process]
                                        },  function(err, results, fields){
                                            if (err) return reject(err);

                                            let processTarget = [];
                                                processTarget.push(
                                                    results[0].t_target
                                                );                 

                                            resolve({processTarget: processTarget});
                                            
                                    });
                                });
                           
                }
                         
        }
        */
            csv.parseCSV('./public/target/process_target.csv', function(data){
                        
                let processTarget = [];

                    for(let i=0; i<data.length; i++){
                        if(data[i].process_name === process.toUpperCase()){

                            processTarget.push(  
                                // parsing to INT to add COMMA bcz he's sleepy
                                parseInt(data[i].t_target)

                            );

                        } 
                    }
                    
                resolve({processTarget: processTarget});
                    
            });

        });
        

            //  promise 2
            let hourlyOutsPromise = new Promise (function(resolve, reject){
                
                //if (err) return reject(err);
                csv.parseCSV('./public/outs/process_outs.csv', function(data){
                    
                    let processOuts = [];

                    for(let i=0; i<data.length; i++){
                        if(data[i].process_id === process.toUpperCase()){
                            processOuts.push(
                                
                                // parsing to INT to add COMMA bcz he's sleepy
                                parseInt(data[i].totalOuts)

                            );

                        } 
                    }
                
                    resolve({processOuts: processOuts});
                
                });

            });
        

        // aggregate multiple promises 
        Promise.all([hourlyTargetPromise, hourlyOutsPromise]).then(function(values){

           let process = req.params.process_url;    //  path
           let data = values;         //    to variable

                    //  subtract to get the variance
                    var variance = data[0]['processTarget'][0] - data[1]['processOuts'][0];
                    
                    //  this is to make variance negative
                    if (variance > 0) { 
                        
                        //  this is to check if the value is null then make the variable zero
                        if (data[0]['processTarget'][0] !== null) {

                            var ggTarget = (data[0]['processTarget'][0]).toLocaleString(undefined,              {maximumFractionDigits: 0});
                        } else {
                            
                            var ggTarget = 0;
                        }

                        if (data[1]['processOuts'][0] !== null) {

                            var ggOuts = (data[1]['processOuts'][0]).toLocaleString(undefined, {maximumFractionDigits: 0}); 
                        } else {
                            
                            var ggOuts = 0;
                        }

                        if (data[0]['processTarget'][0] !== null && data[1]['processOuts'][0] !== null) {
                            
                            var variance = (data[1]['processOuts'][0] - data[0]['processTarget'][0]).toLocaleString(undefined, {maximumFractionDigits: 0});
                            
                            // combine the values with comma
                                data["variance"] = [variance];
                                
                        } else {
                           
                            var variance = 0;
                           // let variance = (data[0]['processTarget'][0] - data[1]['processOuts'][0]).toLocaleString(undefined, {maximumFractionDigits: 0});
                        }
                    
                                
                                data["ggTarget"] = [ggTarget];
                                data["ggOuts"] = [ggOuts];

                    } else {
                        
                        //  this is to check if the value is null then make the variable zero
                        if (data[0]['processTarget'][0] !== null) {

                            var ggTarget = (data[0]['processTarget'][0]).toLocaleString(undefined,              {maximumFractionDigits: 0});
                        } else {
                            
                            var ggTarget = 0;
                        }

                        if (data[1]['processOuts'][0] !== null) {

                            var ggOuts = (data[1]['processOuts'][0]).toLocaleString(undefined, {maximumFractionDigits: 0}); 
                        } else {
                            
                            var ggOuts = 0;
                        }

                        if (data[0]['processTarget'][0] !== null && data[1]['processOuts'][0] !== null) {
                            
                            
                            var variance = '+' + (data[1]['processOuts'][0] - data[0]['processTarget'][0]).toLocaleString(undefined, {maximumFractionDigits: 0});

                            // combine the values with comma
                                data["variance"] = [variance];
                        } else {

                            var variance = 0;
                        }
                                
                            data["ggTarget"] = [ggTarget];
                            data["ggOuts"] = [ggOuts];
                    }
            
            
           //combine all resolve data to be render into front end at once
            res.render(process, {data} );
            
        }); 
 
    }); 


    //  index initializer 
    app.get('/api/view', function(req, res){

        poolLocal.getConnection(function(err, connection){
            if (err) throw err;

            connection.query({
                sql: 'SELECT * FROM view_api WHERE today_date >= CURDATE() - INTERVAL 1 DAY && CURDATE() AND adjusted_target != "0"',
            },  function(err, results, fields){
                if (err) throw err;
                
                    let obj = [];
                    
                        for( let i = 0; i < results.length; i++){
                            obj.push({

                                process_id:     results[i].process_id,
                                process_name:   results[i].process_name,
                                today_date:     new Date(results[i].today_date),
                                stime:          results[i].stime,
                                ntime:          results[i].ntime,
                                default_target: results[i].default_target,
                                adjusted_target:results[i].adjusted_target,
                                total_target:   results[i].total_target,
                                remarks:        results[i].remarks

                            });
                        };
                    
                
                    //  send json 
                    res.send(JSON.stringify(obj));

            });

        // remove connection
        connection.release();

        });

    });

    // update data
    app.post('/api/update', function(req, res){

        poolLocal.getConnection(function(err, connection){
            if (err) throw err;

            if(req.body.process_id) {

                //  need to dis to align the jeasyui datetime with my format
                //startTime = new Date(req.body.stime);
                //endTime = new Date(req.body.ntime);
                today_date = new Date(req.body.today_date);

                //  for target data, compute details
                let computedTarget = Math.round((req.body.uph * (req.body.num_tool - req.body.toolpm)) * (req.body.oee/100)) || 0;


                connection.query({
                    sql: 'UPDATE tbl_target_input SET toolpm =?, remarks= ? WHERE process_id =? AND today_date=? AND stime=? AND ntime=?',
                    values: [req.body.toolpm, req.body.remarks, req.body.process_id, today_date, req.body.stime, req.body.ntime]
                },  function(err, results, fields){
                    if(err) throw err;
                
                console.log(req.body.toolpm, req.body.remarks, req.body.process_id, today_date, req.body.stime, req.body.ntime);
                
                console.log('Target id: ' + req.body.process_id + ' has been updated!');
                res.redirect('back');
            });

            } else {
                
                console.log('something is wrong');
            }

        // remove connection
        connection.release();
            
        });
    });


    // delete tool time
    app.post('/api/delete', function(req, res){
        poolLocal.getConnection(function(err, connection){
            if (err) throw err;
            
            //today_date = new Date(req.body.today_date);

                connection.query({
                    sql: 'UPDATE tbl_target_input SET toolpm =0, remarks= "--" WHERE process_id =? AND today_date=? AND stime=? AND ntime=?',
                    values: [req.body.process_id, req.body.today_date, req.body.stime, req.body.ntime]
                },  function(err, results, field){
                        console.log(req.body.process_id, req.body.today_date, req.body.stime, req.body.ntime);
                        res.redirect('back');
                });
            

        });
    });
        
    //  add tool time data
    app.post('/api/add', function(req, res){
        poolLocal.getConnection(function(err, connection){
            if (err) throw err;

            if(req.body.process_id){

                //  need to dis to align the jeasyui datetime with my format
                startTime = new Date(req.body.startTime);
                endTime = new Date(req.body.endTime);

               //   instead of adding literal values, UPDATE!
                connection.query({
                    sql: 'UPDATE tbl_target_input SET toolpm = ? , remarks = ? WHERE today_date = ? AND process_id = ? AND stime >= ? && stime < ? ',
                    values: [req.body.toolpm, req.body.remarks, new Date(req.body.today_date), req.body.process_id, req.body.stime, req.body.etime]
                },  function(err, results, fields){
                    if (err) throw err;

                    console.log(req.body.toolpm);
                    console.log(req.body.remarks);
                    console.log(new Date(req.body.today_date));
                    console.log(req.body.process_id);
                    console.log(req.body.stime);
                    console.log(req.body.etime);
                        
                                      
                    console.log('Target id: ' + req.body.process_id + ' has been ADDED!');
                    res.redirect('back');

                });

                
            } else {

                console.log('error');
                console.log(req.body.process_id);
            }

        // remove connection
        connection.release();
       
        });

        
    
    });



    //  Settings
    app.get('/settings/view', function(req, res) {

        poolLocal.getConnection(function(err, connection){
            if (err) throw err;

            connection.query({
                sql: 'SELECT * FROM view_default',
            },  function(err, results, fields){
                if (err) throw err;

                    let obj = [];

                    for(let i=0; i < results.length; i++){

                        obj.push({

                            id:         results[i].id,
                            process_name: results[i].process_name,
                            uph:        results[i].uph,
                            oee:        results[i].oee,
                            num_tool:   results[i].num_tool

                        });

                    };

                //  send json 
                res.send(JSON.stringify(obj));

            });

        // remove connection
        connection.release();

        });

        
    });

    //  SETTINGS edit button

    app.post('/settings/update', function(req, res){
    
        poolLocal.getConnection(function(err,connection){
            if (err) throw err;

            if(req.body.id){

                connection.query({
                sql: 'UPDATE tbl_target_default SET uph= ?, oee= ?, num_tool= ? WHERE id = ? ',
                values: [req.body.uph, req.body.oee, req.body.num_tool, req.body.id]

                },  function(err, results, fields){
                    if (err) throw err;
                    
                    console.log('Target id: ' + req.body.id + ' has been updated!');
                    res.redirect('back');

                });
            }else{
                console.log('settings/update api error')
            }
        
        // remove connection
        connection.release();


        });

        

    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.get('/mobile/', function(req, res){

        poolLocal.getConnection(function(err, connection){
            if (err) throw err;

            connection.query({
                sql: 'SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "06:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = "DAMAGE" UNION ALL SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "06:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = "POLY" ',
            }, function(err, results, fields){
                if (err) throw err;

                    let obj = [];
                    

                    for(let i = 0; i< results.length; i++){
                            
                                obj.push({
                                    process_id: results[i].process_id,
                                    process_name: results[i].process_name ,
                                    t_target:  results[i].t_target ,
                                });
                            
                    };

                    let GG = {process: obj};
                
                res.send(GG);

            });
            
        });

    });

    app.get('/gg/:process_url', function(req, res){

        let process = req.params.process_url;
                
            csv.parseCSV('./public/outs/process_outs.csv', function(data){
                
                let processOuts = [];

                for(let i=0; i<data.length; i++){
                    if(data[i].process_id === process.toUpperCase()){
                        processOuts.push(
                            data[i].totalOuts
                        );

                        console.log('it is ' + process + '!');
                        console.log(processOuts);
                    } 
                }
            
            resolve({processOuts: processOuts});
            
          });
    });
}



