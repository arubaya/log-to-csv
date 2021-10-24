
# Log file server to csv

```CLI that convert UIN Suka server log file to csv file```. It uses custom templates as needed.


## Installation

Install log-csv by cloning the resources in this repository

```bash
  git clone https://github.com/arubaya/log-to-csv.git
```
```bash
  cd log-to-csv
```

Next, install all dependencies

```bash
  npm i
```
    
## Run Locally

To run this script, you can use the command line.

```bash
  node . --help
```




  
## Usage
Before running the script, there are things to note:

- Create ```data``` directory in root folder
- Move the log file to be processed to the ```data``` directory

```bash
.
├── bin
├── data
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```
Use the ```node . --help``` command to display help, , it will appear as below

```bash

---Welcome to Log converter to CSV---

Usage:  <command> [option] [argument]


Commands:
  db          Create database and create log table
  insert      Insert log file data to database
  create-csv  Convert all log file in folder to CSV

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  create-csv  -F "./data/" -f "autosurat.access.log" -c "52"
  insert      -F "./data/" -f "autosurat.access.log" -c "52"
```
## Examples
Convert all log file in folder to CSV
```bash
node . create-csv -F "./data/" -f "autosurat.access.log" -c "52"
```
flags ```-F``` for folder path of all log file, which is in the ```data``` directory

flags ```-f``` for log file name, wihthout Iteration number,
ex: the name of the log file is ```autosurat.access.log.1```, then just write ```autosurat.access.log```

flags ```-c``` for number of files in folder

OR just run ```node . create-csv --help```
```bash
create-csv

Convert all log file in folder to CSV

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  -F, --folder   Folder path of all log file
                                        [string] [required] [default: "./data/"]
  -f, --file     Log file name                               [string] [required]
  -c, --count    Number of files in folder                   [string] [required]
```