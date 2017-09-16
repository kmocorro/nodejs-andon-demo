SET time_zone = '+8:00';

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'DAMAGE'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'POLY'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'BSGDEP'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NTM'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NOXE'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'NDEP'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PTM'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TOXE'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'CLEANTEX'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PDRIVE'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ARC_BARC'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PBA'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'LCM'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'SEED'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'FGA'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLM'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'EDG_CTR'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'PLATING'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'ETCHBK'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'HST'

UNION ALL

SELECT process_id, process_name, SUM(CASE WHEN today_date = CURDATE() AND stime >= "18:30:00" && stime < CURTIME() - INTERVAL 10 MINUTE THEN total_target ELSE 0 END) AS t_target FROM  view_target WHERE process_name = 'TEST'
