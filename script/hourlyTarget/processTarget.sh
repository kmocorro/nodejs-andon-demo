# !/bin/bash
# Query DAMAGE real-time outs 
# KEVIN B MOCORRO
# Version 1.0

# this should run every 5 mins
cd /c/demo/andon/script/hourlyTarget
PATH=$PATH:/c/xampp/mysql/bin
CURRENT_TIME=`date "+%H:%M:%S"`
START_AM_SHIFT="06:30:00"
END_AM_SHIFT="18:29:59"
START_PM_SHIFT="18:30:00"
END_PM_SHIFT="06:29:59"
NOTYETMIDNIGHT="11:59:59"
MIDNIGHT="00:00:00"

HOST="localhost"
USER="root"
PASS="2qhls34r"
DB="dbtarget"

# Convert declared time to seconds so we could compare
G_START_AM_SHIFT=`echo $START_AM_SHIFT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_END_AM_SHIFT=`echo $END_AM_SHIFT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_START_PM_SHIFT=`echo $START_PM_SHIFT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_END_PM_SHIFT=`echo $END_PM_SHIFT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_MIDNIGHT=`echo $MIDNIGHT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_NOTYETMIDNIGHT=`echo $NOTYETMIDNIGHT | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`
G_CURRENT_TIME=`echo $CURRENT_TIME | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`


echo "now running... total process TARGET"

# Now we compare current time to check the shift then load specific time query
    if [ "$G_CURRENT_TIME" -ge "$G_START_AM_SHIFT" ] && [ "$G_CURRENT_TIME" -le "$G_END_AM_SHIFT" ]; then
        
        echo "AM shift"

        echo $G_START_AM_SHIFT
        echo $G_CURRENT_TIME
        echo $G_END_AM_SHIFT

        echo "loading... please wait"
        mysql -h$HOST -u$USER -p$PASS $DB < 630to1830.sql | sed 's/\t/,/g' > target_amTopm_temp.csv
        cp target_amTopm_temp.csv '/c/demo/andon/public/target/process_target.csv'
        #sleep 1000
    else

        if [ "$G_CURRENT_TIME" -ge "$G_START_PM_SHIFT" ] && [ "$G_NOTYETMIDNIGHT" -le "$G_CURRENT_TIME" ]; 
        then
            
            echo $G_START_PM_SHIFT
            echo $G_CURRENT_TIME
            echo $G_NOTYETMIDNIGHT

            echo "PM shift between PM and Not yet midnight"
            echo "loading... please wait"
            mysql -h$HOST -u$USER -p$PASS $DB < 1830to0000.sql | sed 's/\t/,/g' > target_pmTomid_temp.csv
            cp target_pmTomid_temp.csv '/c/demo/andon/public/target/process_target.csv'
            #sleep 1000

        elif [ "$G_CURRENT_TIME" -ge "$G_MIDNIGHT" ] && [ "$G_CURRENT_TIME" -le "$G_END_PM_SHIFT" ]; 
        then

            echo $G_MIDNIGHT
            echo $G_CURRENT_TIME
            echo $G_END_PM_SHIFT

            echo "PM shift between MIDNIGHT and PM END shift"
            echo "loading... please wait"
            mysql -h$HOST -u$USER -p$PASS $DB < 0000to0630.sql | sed 's/\t/,/g' > target_midToam_temp.csv
            cp target_midToam_temp.csv '/c/demo/andon/public/target/process_target.csv'
             
            #sleep 1000

        fi

    fi



echo "DONE!"
sleep 11