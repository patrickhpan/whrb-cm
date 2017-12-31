--select * from "Recordings" where "isOrch" is null order by duration desc
--select * from "Recordings" where piece like 'Sonata%' and "isOrch" = True
--SELECT * from "Recordings" WHERE "isOrch" IS True AND (performer like '%members%' OR performer like '%Members%')
SELECT * from "Recordings" WHERE (
	piece like '%Mass%' or
	piece like '%Missa%' or
	piece like '%Messa%'
) AND "isOrch" is False

--UPDATE "Recordings" SET "isOrch" = True WHERE performer LIKE '%Orchestra%'

--update "Recordings" set "isOrch" = False where
-- 	id = 63026;
--	id = 49675;
--	id = 45388;
--	catalog like 'LP 1007';
--	catalog like 'CD 05472 77348 2';
--	id = 59642;
--  id = 36340;

--update "Recordings" set "isOrch" = False where piece like 'Sonata%' and "isOrch" is not true

--update "Recordings" set "isOrch" = True where piece like '%Motet%'

--update "Recordings" set "isOrch" = False WHERE (
--	piece like '%Quintet%' or
--	piece like '%quintet%' or
--	piece like '%Quartet%' or
--	piece like '%quartet%' or
--	piece like '%Trio%' or
--	piece like '%trio%'
--) AND "isOrch" is not True;