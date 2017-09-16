set time_zone = '+8:00';

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'DAMAGE') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'DAMAGE') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'POLY') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'POLY') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'BSGDEP') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'BSGDEP') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NTM') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NTM') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NOXE') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NOXE') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NDEP') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NDEP') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PTM') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PTM') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TOXE') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TOXE') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'CLEANTEX') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'CLEANTEX') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PDRIVE') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PDRIVE') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ARC_BARC') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ARC_BARC') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PBA') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PBA') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'LCM') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'LCM') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'SEED') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'SEED') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'FGA') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'FGA') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLM') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLM') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'EDG_CTR') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'EDG_CTR') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLATING') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLATING') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ETCHBK') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ETCHBK') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'HST') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'HST') B  ON A.process_id = B.process_id )

UNION ALL

SELECT A.process_id, B.process_name, (A.t_target + B.t_target) as t_target FROM ( (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() - INTERVAL 1 DAY AND stime >= "18:30:00" THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TEST') A  JOIN (SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "00:00:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TEST') B  ON A.process_id = B.process_id )
