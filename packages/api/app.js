const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
