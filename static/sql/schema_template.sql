-- Drop if it already exists
DROP TABLE IF EXISTS globalTemperature;
DROP TABLE IF EXISTS coralReef;
DROP TABLE IF EXISTS merged;
-- Create Two Tables
CREATE TABLE globalTemperature (
  year INT,
  LandAndOceanAverageTemperature NUMERIC
);

-- CREATE TABLE coralReef (
  -- id INT PRIMARY KEY,
  --Country_name TEXT,
  --Total_Population INT,
  --Population_Density INT
--);