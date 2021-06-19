-- Checking data was properly loaded
SELECT * 
FROM globalTemperature;
SELECT * 
FROM coralReef;
-- Join tables on county_id
CREATE TABLE merged AS  
SELECT globalTemperature.year, globalTemperature.LandAndOceanAverageTemperature, coralReef., coralReef., coralReef
FROM globalTemperature
JOIN coralReef 
ON  = ;

SELECT * FROM merged;