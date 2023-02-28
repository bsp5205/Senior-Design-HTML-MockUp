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

let complexity_names = ['Cyclomatic Complexity (CC)', 'Lines of Code (LOC)', 'Weighted Methods per Class (WMC)', 'ABC'];
let coupling_names = ['Coupling Factor (COF)', 'Coupling between objects (CBO)'];
let cohesion_names = ['Depth of Inheritance (DIT)', 'Method Hiding Factor (MHF)', 'Attribute Hiding Factor (AHF)'];

let naming_names = ['Class', 'Method', 'Attribute'];
let general_names = ['Comment Percentage (CP)', 'Token Count (TC)'];


let student_1 = new Student();
student_1.name = 'Student 1';
student_1.studentID = '123';

let student_1_submission = new Submission();
student_1_submission.submission_time = 'December 30, 2022 at 9:37PM';

let file_1 = new Submission_File();
file_1.name = 'DNAApp.java';
file_1.id = '1';
file_1.code = '//\n' +
    '// DNAApp.java\n' +
    '// Class to read in file and find protein coding regions of a DNA strand\n' +
    '//\n' +
    '// @author Brandon Pijanowski\n' +
    '//\n' +
    'import javax.swing.text.Utilities;\n' +
    'import java.io.File;\n' +
    'import java.io.FileNotFoundException;\n' +
    'import java.util.Scanner;\n' +
    '\n' +
    'public class DNAApp {\n' +
    '    //\n' +
    '    // Main to read in file and create DNA objects\n' +
    '    // @param args\n' +
    '    //\n' +
    '    public static void main(String [] args){\n' +
    '\n' +
    '        String filepath = "";\n' +
    '        Scanner scan = new Scanner(System.in);\n' +
    '\n' +
    '        System.out.println("Please enter the file path:");\n' +
    '        filepath = scan.nextLine();\n' +
    '\n' +
    '        File file = new File(filepath);\n' +
    '\n' +
    '        int flag = 1;\n' +
    '        String head = "";\n' +
    '        String strand = "";\n' +
    '        String line = "";\n' +
    '        DNA dna1;\n' +
    '        String temp = "";\n' +
    '\n' +
    '        try {\n' +
    '\n' +
    '            Scanner scanFile = new Scanner(file);\n' +
    '\n' +
    '            while(scanFile.hasNextLine()){\n' +
    '\n' +
    '                line= scanFile.nextLine();\n' +
    '                //System.out.println("line: " + line);\n' +
    '                //System.out.println(line);\n' +
    '\n' +
    '                if(line.contains(">") && (flag == 1)){\n' +
    '\n' +
    '                    head = line;\n' +
    '                    //System.out.println(head);\n' +
    '                    strand = "";\n' +
    '                    flag = 0;\n' +
    '\n' +
    '                    continue;\n' +
    '                }\n' +
    '\n' +
    '                if(!line.contains(">")){\n' +
    '                    strand += line;\n' +
    '                }\n' +
    '\n' +
    '                if(line.contains(">") || !scanFile.hasNextLine()){\n' +
    '\n' +
    '                    String f1 = "";\n' +
    '                    String f2 = "";\n' +
    '                    temp = line;\n' +
    '                    System.out.println(head);\n' +
    '                    dna1 = new DNA(head,strand);\n' +
    '                    dna1.santizeDNA(dna1.dnaStrand);\n' +
    '\n' +
    '                    f1 = dna1.findFrameOne(dna1.dnaStrand);\n' +
    '                    f2 = dna1.findFrameTwo(dna1.dnaStrand);\n' +
    '\n' +
    '                    PCRList pcr = new PCRList();\n' +
    '                    pcr = outputCodingRegions(dna1.dnaStrand);\n' +
    '                    System.out.println(pcr);\n' +
    '                    pcr = outputCodingRegions(f1);\n' +
    '                    System.out.println(pcr);\n' +
    '                    pcr = outputCodingRegions(f2);\n' +
    '                    System.out.println(pcr);\n' +
    '                    strand = "";\n' +
    '                    head = temp;\n' +
    '                }\n' +
    '\n' +
    '                //System.out.println(strand);\n' +
    '\n' +
    '\n' +
    '            }\n' +
    '\n' +
    '        } catch (FileNotFoundException fnf) {\n' +
    '\n' +
    '            fnf.printStackTrace();\n' +
    '\n' +
    '        }\n' +
    '\n' +
    '\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    public static PCRList outputCodingRegions(String dna){\n' +
    '        // adds - till length is divisible by 3\n' +
    '        while(dna.length() % 3 != 0){\n' +
    '            dna += "-";\n' +
    '        }\n' +
    '        String test = "";\n' +
    '        PCRList pcr = new PCRList();\n' +
    '        int i = 0;\n' +
    '        int z = 0;\n' +
    '        String codon = "";\n' +
    '        int length = dna.length();\n' +
    '\n' +
    '        while(i < dna.length()){ // while counter is less than the end of the strand\n' +
    '\n' +
    '            codon = dna.substring(i,i+3); // loop till start codon\n' +
    '\n' +
    '            if(codon.equals("ATG")){ // find start codon\n' +
    '\n' +
    '                z = i; // set z to the start\n' +
    '\n' +
    '                while(z < dna.length()){ // use z to loop from start(i) till finding a stop codon or till end of strand\n' +
    '\n' +
    '                    codon = dna.substring(z,z+3);\n' +
    '\n' +
    '                    if(codon.equals("TAG") || codon.equals("TGA") || codon.equals("TAA") || z == length - 3){\n' +
    '\n' +
    '                        //if if starting pos is a start codon and there is a valid end codon or end o strand\n' +
    '                        if((dna.substring(i,i+3).equals("ATG")) &&\n' +
    '                                ((dna.substring(z,z+3).equals("TAG")) || (dna.substring(z,z+3).equals("TGA")) || (dna.substring(z,z+3).equals("TAA")) || z == length - 3)){\n' +
    '\n' +
    '                            //if there is not a valid end then add the rest of the line\n' +
    '                            if(!((dna.substring(z,(z+3)).equals("TAG")) || (dna.substring(z,z+3).equals("TGA")) || (dna.substring(z,z+3).equals("TAA")) )\n' +
    '                                    && z == length - 3){\n' +
    '\n' +
    '                                pcr.add(dna.substring(i,(z)));\n' +
    '                            }else{\n' +
    '\n' +
    '                                //checks if two tart codons are right next to one another and only adds one\n' +
    '                                if(dna.substring(i,i+3).equals("ATG")&& dna.substring(i+3,i+6).equals("ATG")){\n' +
    '                                    pcr.add(dna.substring((i+3),((z+3))));\n' +
    '                                }else{\n' +
    '                                    pcr.add(dna.substring(i,(z+3)));\n' +
    '                                }\n' +
    '                            }\n' +
    '\n' +
    '                        }\n' +
    '\n' +
    '                        i = z+3;\n' +
    '\n' +
    '                        break;\n' +
    '\n' +
    '                    }\n' +
    '\n' +
    '                    z+=3;\n' +
    '                }\n' +
    '\n' +
    '            }\n' +
    '\n' +
    '            i+=3;\n' +
    '        }\n' +
    '        return pcr;\n' +
    '    }\n' +
    '}\n'

file_1.QMA_scores = [90, 65, 10, 35];

file_1.complexity_scores = [100, 69, 50, 60];
file_1.coupling_scores = [70, 40];
file_1.cohesion_scores = [50, 40, 40];
file_1.naming_scores= [50,70,80];
file_1.general_scores = [100,60];

file_1.CMA_scores = [100, 80, 65];

let file_2 = new Submission_File();
file_2.name = 'Homework1.cpp'
file_2.id = '2'
file_2.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "Hello from Class 2";\n' +
    '    return 0;\n' +
    '}'
file_2.QMA_scores = [0, 40, 10, 5];

file_2.complexity_scores = [70, 40, 50, 60];
file_2.coupling_scores = [50, 60];
file_2.cohesion_scores = [80, 90, 40];
file_2.naming_scores = [30,60,50];
file_2.general_scores= [60,70];

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
file_12.name = 'DNA.java';
file_12.id = '1';
file_12.code = 'import java.io.File;\n' +
    'import java.io.FileNotFoundException;\n' +
    'import java.util.Scanner;\n' +
    '\n' +
    '//\n' +
    '// DNAApp.java\n' +
    '//\n' +
    '// class to read in a file from the user and output the\n' +
    '//\n' +
    '// @author Kenneth Burt\n' +
    '//\n' +
    'public class DNAApp extends DNA {\n' +
    '    public static void main(String[] args) throws FileNotFoundException {\n' +
    '        String Header;\n' +
    '        String DNA = "";\n' +
    '        String input;\n' +
    '\n' +
    '        Scanner keyBoard = new Scanner(System.in);\n' +
    '\n' +
    '        System.out.println("What is the name of the file?");\n' +
    '        input = keyBoard.nextLine();\n' +
    '\n' +
    '        File DNAFile = new File(input);\n' +
    '        Scanner DNAScan = new Scanner(DNAFile);\n' +
    '\n' +
    '        Header = DNAScan.nextLine();\n' +
    '\n' +
    '        int iterator = 2;\n' +
    '        while(DNAScan.hasNextLine()) {\n' +
    '            DNA = DNA + DNAScan.nextLine();\n' +
    '            iterator++;\n' +
    '        }\n' +
    '\n' +
    '        DNA ProteinCodes = new DNA(Header, DNA);\n' +
    '\n' +
    '        System.out.println(Header + "\\n" + ProteinCodes.getPCRs().toString());\n' +
    '    }\n' +
    '}\n'
file_12.QMA_scores = [100, 33, 67, 12];

file_12.complexity_scores = [60, 20, 60, 40];
file_12.coupling_scores = [90, 30];
file_12.cohesion_scores = [40, 30, 70];
file_12.naming_scores = [40,70,60];
file_12.general_scores = [100,60];


file_12.CMA_scores = [34, 56, 76];

let file_23 = new Submission_File();
file_23.name = 'Homework1_2.cpp'
file_23.id = '2'
file_23.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "I am Student 2, Hello from Class 2";\n' +
    '    return 0;\n' +
    '}'
file_23.QMA_scores = [45, 67, 43, 43];

file_23.complexity_scores = [60, 80, 40, 60];
file_23.coupling_scores = [60, 50];
file_23.cohesion_scores = [70, 80, 50];
file_23.naming_scores = [40,60,80];
file_23.general_scores = [90,50];

file_23.CMA_scores = [43, 56, 78];

student_2_submission.file_list.push(file_12);
student_2_submission.file_list.push(file_23);

student_2.submission = student_2_submission;

student_list.push(student_2)

let student_3 = new Student();
student_3.name = 'Student 3';
student_3.studentID = '789';
let student_3_submission = new Submission();
student_3_submission.submission_time = 'December 28, 2022 at 2:15PM';

let file_31 = new Submission_File();
file_31.name = 'DNA.java';
file_31.id = '1';
file_31.code = 'import java.io.File;\n' +
    'import java.io.FileNotFoundException;\n' +
    'import java.util.Scanner;\n' +
    '\n' +
    '//\n' +
    '// DNAApp.java\n' +
    '//\n' +
    '// class to read in a file from the user and output the\n' +
    '//\n' +
    '// @author Kenneth Burt\n' +
    '//\n' +
    'public class DNAApp extends DNA1 {\n' +
    '\n' +
    '    public String Header;\n' +
    '    public String DNA = "";\n' +
    '    private String input;\n' +
    '\n' +
    '    public static void main(String[] args) throws FileNotFoundException {\n' +
    '\n' +
    '        Scanner keyBoard = new Scanner(System.in);\n' +
    '\n' +
    '        System.out.println("What is the name of the file?");\n' +
    '        input = keyBoard.nextLine();\n' +
    '\n' +
    '        File DNAFile = new File(input);\n' +
    '        Scanner DNAScan = new Scanner(DNAFile);\n' +
    '\n' +
    '        Header = DNAScan.nextLine();\n' +
    '\n' +
    '        int iterator = 2;\n' +
    '        while(DNAScan.hasNextLine()) {\n' +
    '            DNA = DNA + DNAScan.nextLine();\n' +
    '            iterator++;\n' +
    '        }\n' +
    '\n' +
    '        DNA ProteinCodes = new DNA(Header, DNA);\n' +
    '\n' +
    '        System.out.println(Header + "\\n" + ProteinCodes.getPCRs().toString());\n' +
    '    }\n' +
    '}\n'
file_31.QMA_scores = [100, 33, 67, 12];

file_31.complexity_scores = [60, 20, 60, 40];
file_31.coupling_scores = [90, 30];
file_31.cohesion_scores = [40, 30, 70];
file_31.naming_scores = [40,70,60];
file_31.general_scores = [80,70];


file_31.CMA_scores = [34, 56, 76];

let file_32 = new Submission_File();
file_32.name = 'HW1.cpp'
file_32.id = '2'
file_32.code = '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '    std::cout << "I am Student 3, Hello from Class 2";\n' +
    '    return 0;\n' +
    '}'
file_32.QMA_scores = [45, 67, 43, 43];

file_32.complexity_scores = [60, 80, 40, 60];
file_32.coupling_scores = [60, 50];
file_32.cohesion_scores = [70, 80, 50];
file_32.naming_scores = [40,60,80];
file_32.general_scores = [90,50];

file_32.CMA_scores = [43, 56, 78];

student_3_submission.file_list.push(file_31);
student_3_submission.file_list.push(file_32);

student_3.submission = student_3_submission;

student_list.push(student_3)

let t = [50,50,50,50,50,50,50,50,50,50,50,50,50,50]

app.get("/", function(req,res){
    let prev_student = student_list[0]
    res.render("index2.ejs", {displayed_file_id:student_list[0].submission.file_list[0].id, selected_student:student_list[0], focus_file:student_1_submission.file_list[0],student_list:student_list, threshold_list:t, next_student:student_list[1], prev_student:prev_student, complexity_names:complexity_names, coupling_names:coupling_names, cohesion_names:cohesion_names, naming_names:naming_names, general_names:general_names});
});

app.get("/2", function(req,res){
    let prev_student = student_list[0];
    res.render("index2.ejs", {displayed_file_id:student_list[0].submission.file_list[0].id, selected_student:student_list[0], focus_file:student_1_submission.file_list[0],student_list:student_list, threshold_list:t, next_student:student_list[1], prev_student:prev_student, complexity_names:complexity_names, coupling_names:coupling_names, cohesion_names:cohesion_names, naming_names:naming_names, general_names:general_names});

});


app.post('/change_student', (req, res) =>{
    let id = req.body.student_list;
    //console.log(id)
    t = req.body.test;
    console.log(t)

    let temp = req.body.fuck2;

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
            //console.log(student_list[i].submission.file_list)
            res.render("index2.ejs", {displayed_file_id:student_list[i].submission.file_list[0].id, selected_student:student_list[i],focus_file:student_list[i].submission.file_list[0], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student, complexity_names:complexity_names, coupling_names:coupling_names, cohesion_names:cohesion_names, naming_names:naming_names, general_names:general_names});
        }
    }
});

app.post('/next_student', (req, res) =>{
    let id = req.body.next_student;
    console.log(id)
    let next_student;
    let prev_student;

    //let temp = req.body.fuck2;
    let next_student_hidden_list = req.body.next_student_hidden;
    let prev_student_hidden_list = req.body.prev_student_hidden;
    if(next_student_hidden_list !== undefined){
        t = next_student_hidden_list
    }else if(prev_student_hidden_list !== undefined){
        t = prev_student_hidden_list
    }
    console.log(t)

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
            //console.log(student_list[i].submission.file_list[i])
            res.render("index2.ejs", {displayed_file_id:student_list[i].submission.file_list[0].id, selected_student:student_list[i],focus_file:student_list[i].submission.file_list[0], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student, complexity_names:complexity_names, coupling_names:coupling_names, cohesion_names:cohesion_names, naming_names:naming_names, general_names:general_names});
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
                    res.render("index2.ejs", {displayed_file_id:student_list[i].submission.file_list[j].id,selected_student:student_list[i],focus_file:student_list[i].submission.file_list[j], student_list:student_list, threshold_list:t, next_student:next_student, prev_student:prev_student, complexity_names:complexity_names, coupling_names:coupling_names, cohesion_names:cohesion_names, naming_names:naming_names, general_names:general_names});
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

