const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

var bodyParser = require('body-parser');

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

class Student {
    name = '';
    studentID = '';
    submission;
    submission_time = '';
}

class Submission {
    name = '';
    submission_time = '';
    file_list = [];
}

class Submission_File{
    code = ''
    QMA_names = ['CC', 'Coupling', 'Cohesion', 'LOC'];
    CMA_names = ['Variable Names', 'Class Names', 'Comment Percentage'];
}

let student_1 = new Student();
student_1.name = 'Student 1';
student_1.studentID = '123';

let student_1_submission = new Submission();
student_1_submission.submission_time = 'December 30, 2022 at 9:37PM';

let file_1 = new Submission_File();
file_1.name = 'Test';
file_1.id = '1';
file_1.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "Hello World!";\n' +
    '    return 0;\n' +
    '}'

file_1.QMA_scores = [90, 65, 10, 35];
file_1.CMA_scores = [100, 80, 65];

let file_2 = new Submission_File();
file_2.name = 'Test 2'
file_2.id = '2'
file_2.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "Hello from Class 2";\n' +
    '    return 0;\n' +
    '}'
file_2.QMA_scores = [0, 40, 10, 5];
file_2.CMA_scores = [87, 55, 40];

student_1_submission.file_list.push(file_1);
student_1_submission.file_list.push(file_2);

student_1.submission = student_1_submission;

let student_list = [];
student_list.push(student_1);

let student_2 = new Student();
student_2.name = 'Student 2';
student_2.studentID = '456';
let student_2_submission = new Submission();
student_2_submission.submission_time = 'December 29, 2022 at 2:15PM';

let file_12 = new Submission_File();
file_12.name = 'Student 2 Test';
file_12.id = '1';
file_12.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "I am Student 2, Hello World!";\n' +
    '    return 0;\n' +
    '}'
file_12.QMA_scores = [100, 33, 67, 12];
file_12.CMA_scores = [34, 56, 76];

let file_23 = new Submission_File();
file_23.name = 'Student 2 Test 2'
file_23.id = '2'
file_23.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "I am Student 2, Hello from Class 2";\n' +
    '    return 0;\n' +
    '}'
file_23.QMA_scores = [45, 67, 43, 43];
file_23.CMA_scores = [43, 56, 78];

student_2_submission.file_list.push(file_12);
student_2_submission.file_list.push(file_23);

student_2.submission = student_2_submission;

student_list.push(student_2)
let t = [50,50,50,50,50,50,50]

app.get("/", function(req,res){
    let prev_student = student_list[0]
    res.render("index.ejs", {displayed_file_id:student_list[0].submission.file_list[0].id, selected_student:student_list[0], focus_file:student_1_submission.file_list[0],student_list:student_list, threshold_list:t, next_student:student_list[1], prev_student:prev_student});
});

app.post('/change_student', (req, res) =>{
    let id = req.body.student_list;
    //console.log(id)
    t = req.body.test;
    //console.log(t)

    let temp = req.body.fuck2;
    console.log(temp)

    let next_student;
    let prev_student;
    //scan each student looking for passed student ID
    for(let i = 0; i < student_list.length; i++){
        if(student_list[i].studentID == id){
            if(i == 0){
                prev_student = student_list[i]
                next_student = student_list[i + 1]
            } else if(i == student_list.length - 1){
                next_student = student_list[i]
                prev_student = student_list[i - 1]
            } else{
                next_student = student_list[i + 1]
                prev_student = student_list[i - 1]
            }
            student_list[i].QMA_scores = temp;
            res.render("index.ejs", {displayed_file_id:student_list[i].submission.file_list[i].id, selected_student:student_list[i],focus_file:student_list[i].submission.file_list[0], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student});
        }
    }
});

app.post('/next_student', (req, res) =>{
    let id = req.body.next_student;
    console.log(id)
    let next_student;
    let prev_student;

    let temp = req.body.fuck2;
    console.log(temp)

    //scan each student looking for passed student ID
    for(let i = 0; i < student_list.length; i++){
        if(student_list[i].studentID == id){
            if(i == 0){
                prev_student = student_list[i]
                next_student = student_list[i + 1]
            } else if(i == student_list.length - 1){
                next_student = student_list[i]
                prev_student = student_list[i - 1]
            } else{
                next_student = student_list[i + 1]
                prev_student = student_list[i - 1]
            }
            res.render("index.ejs", {displayed_file_id:student_list[i].submission.file_list[i].id, selected_student:student_list[i],focus_file:student_list[i].submission.file_list[0], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student});
        }
    }
});

app.post('/change_file', (req, res) =>{
    let student_id = req.body.student_id;
    //console.log(student_id);
    let file_id = req.body.file_id;
    //console.log(file_id);

    t = req.body.fuck;
    console.log(t)

    // let qma_changes = req.body.fuck2;
    // console.log(qma_changes)
    //
    // let cma_changes = req.body.fuck3;
    // console.log(cma_changes);
    //
    // let prev_displayed_file_id = req.body.displayed_file_id;
    // console.log(prev_displayed_file_id);
    //
    // for(let i = 0; i < student_list.length; i++) {
    //     if(student_list[i].studentID == student_id){
    //         for(let j = 0; j < student_list[i].submission.file_list.length; j++){
    //                 student_list[j].submission.file_list[j].QMA_scores = qma_changes;
    //                 student_list[j].submission.file_list[j].CMA_scores = cma_changes;
    //         }
    //     }
    // }
    let next_student;
    let prev_student;

    //scan each student looking for passed student ID
    for(let i = 0; i < student_list.length; i++){
        if(student_list[i].studentID == student_id){
            //scan each file looking for passed file ID

            for(let j = 0; j < student_list[i].submission.file_list.length; j++){
                if(i == 0){
                    prev_student = student_list[i]
                    next_student = student_list[i + 1]
                } else if(i == student_list.length - 1){
                    next_student = student_list[i]
                    prev_student = student_list[i - 1]
                } else{
                    next_student = student_list[i + 1]
                    prev_student = student_list[i - 1]
                }
                if(student_list[i].submission.file_list[j].id == file_id){
                    res.render("index.ejs", {displayed_file_id:student_list[i].submission.file_list[j].id,selected_student:student_list[i],focus_file:student_list[i].submission.file_list[j], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student});
                }
            }
        }
    }
});

app.get("/cma_summary", function(req,res){
    res.render("cma_summary.ejs");
});

app.get("/qma_summary", function(req,res){
    res.render("qma_summary.ejs");
});

