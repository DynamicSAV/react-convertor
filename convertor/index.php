
<?php

header("Access-Control-Allow-Origin: *");

$romes = array(
  "M" => 1000,
  "CM" => 900,
  "D" =>  500,
  "CD" =>  400,
  "C" => 100,
  "XC" => 90,
  "L" => 50,
  "XL" => 40,
  "X" => 10,
  "IX" => 9,
  "V" => 5,
  "IV" => 4,
  "I" => 1
);

function toRomanConvert($number, $romes)
{
  if ($number === 0) {
    return 0;
  }
  $result = '';
  foreach ($romes as $item => $itemCount) {
    while ($itemCount <= $number) {
      $result = $result . $item;
      $number = $number - $itemCount;
    }
  }
  return $result;
}

function fromRomanConvert($romanNumber, $romes)
{
  $result = 0;
  foreach ($romes as $item => $itemCount) {
    while (strpos($romanNumber, $item) === 0) {
      $result += $itemCount;
      $romanNumber = mb_substr($romanNumber, 1, strlen($item) + 1);
    }
  }
  return $result;
}

function otherConvert($fromNumber, $fromNumberSystem, $toNumberSystem, $romes) //Из других систем в десятичную
{
  $numSys = 0;
  switch ($fromNumberSystem) {
    case "BIN":
      $numSys = 2;
      break;
    case "DEC":
      $numSys = 10;
      break;
    case "HEX":
      $numSys = 8;
  }
  return base_convert((int)$fromNumber, $numSys, 10);
}

function fromNumToDec($fromNumberSystem, $toNumberSystem, $fromNumber, $romes) //начальное число коневертируется в десятичное
{
  if (($fromNumberSystem === "ROM" && $toNumberSystem !== "ROM")) {
    return fromRomanConvert($fromNumber, $romes); //Риское число в десятичное
  } else if ($fromNumberSystem === "ROM" && $toNumberSystem == "ROM") {
    return $fromNumber; //Римское число остается им же
  } else {
    return otherConvert($fromNumber, $fromNumberSystem, $toNumberSystem, $romes); //Из других систем в десятичную
  }
}

function resultConvert($fromNumberSystem, $toNumberSystem, $fromNumber, $toNumber, $romes)
{
  $fromNum = fromNumToDec($fromNumberSystem, $toNumberSystem, $fromNumber, $romes);
  $numSys = 0;
  if ($toNumberSystem !== "ROM") {
    switch ($toNumberSystem) {
      case "BIN":
        $numSys = 2;
        break;
      case "DEC":
        $numSys = 10;
        break;
      case "HEX":
        $numSys = 8;
        break;
    }
    return base_convert($fromNum, 10, $numSys);
  } else {
    return toRomanConvert($fromNum, $romes);
  }
}

$fromNumber = $_GET['fromNumber'];
$toNumber = $_GET['toNumber'];
$fromNumberSystem = $_GET['fromNumberSystem'];
$toNumberSystem = $_GET['toNumberSystem'];

print_r(resultConvert($fromNumberSystem, $toNumberSystem, $fromNumber, $toNumber, $romes));
