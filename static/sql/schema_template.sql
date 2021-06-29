-- Drop if it already exists
DROP TABLE IF EXISTS AllDataStateTemperature;
DROP TABLE IF EXISTS stateTemperature;
DROP TABLE IF EXISTS stateDeforestation;
DROP TABLE IF EXISTS merged;
-- Create Two Tables
CREATE TABLE AllDataStateTemperature (
  Year INT,
  AcreAvgTemp NUMERIC, 
  AmazonasAvgTemp NUMERIC, 
  MatoGrossoAvgTemp NUMERIC, 
  RoraimaAvgTemp NUMERIC,
  TocantinsAvgTemp NUMERIC
);

CREATE TABLE stateTemperature(
  State VARCHAR,
  AverageTemperature NUMERIC,
  Lat NUMERIC,
  Lon NUMERIC
);

CREATE TABLE stateDeforestation(
  year NUMERIC,
  Acre NUMERIC,
  Amazonas NUMERIC,
  Mato_Grosso NUMERIC,
  Roraima NUMERIC,
  Tocantins NUMERIC,
  Total_KM2_Per_Year NUMERIC
);