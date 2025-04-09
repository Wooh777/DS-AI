#include <iostream>
#include "StudentList.h"

int main() {
    std::cout << " Test Case 1: Basic addStudent and printAllStudents \n";
    StudentList list1;

    double scoresAlice[] = {99.0, 88.0, 92.0};
    double scoresBob[] = {85.0, 90.0, 87.0};

    Student alice("Alice", 1001, scoresAlice, 3);
    Student bob("Bob", 1002, scoresBob, 3);

    list1.addStudent(alice);
    list1.addStudent(bob);
    list1.printAllStudents();

    std::cout << "\n Test Case 2: removeStudentByID and Resizing \n";
    StudentList list2;

    double scores1[] = {70.0, 80.0};
    double scores2[] = {60.0, 65.0};
    double scores3[] = {90.0, 95.0};

    Student s1("S1", 2001, scores1, 2);
    Student s2("S2", 2002, scores2, 2);
    Student s3("S3", 2003, scores3, 2);

    list2.addStudent(s1);
    list2.addStudent(s2);
    list2.addStudent(s3); 

    std::cout << "Before removal:\n";
    list2.printAllStudents();

    bool removed = list2.removeStudentByID(2002); 
    std::cout << "Remove S2 (ID 2002): " << (removed ? "Success" : "Failed") << std::endl;

    std::cout << "After removal:\n";
    list2.printAllStudents();

    bool notFound = list2.removeStudentByID(9999); 
    std::cout << "Attempt to remove nonexistent ID 9999: " << (notFound ? "Unexpected!" : "Correctly failed") << std::endl;

    std::cout << "\n Test Case 3: Deep Copy Check \n";
    StudentList listA;
    listA.addStudent(alice);
    listA.addStudent(bob);

    StudentList listB(listA); 
    StudentList listC;
    listC = listA; 

    listA.removeStudentByID(1001); 

    std::cout << "Original list after removal:\n";
    listA.printAllStudents();

    std::cout << "Copied listB (should include Alice):\n";
    listB.printAllStudents();

    std::cout << "Assigned listC (should include Alice):\n";
    listC.printAllStudents();

    std::cout << "\n Test Case 4: Searching by Name or ID \n";
    StudentList list4;
    list4.addStudent(alice);
    list4.addStudent(bob);

    Student* result1 = list4.findStudentByName("Alice");
    std::cout << "Search by name (Alice): " << (result1 ? "Found" : "Not found") << std::endl;

    Student* result2 = list4.findStudentByID(1002);
    std::cout << "Search by ID (1002): " << (result2 ? "Found" : "Not found") << std::endl;

    Student* result3 = list4.findStudentByName("Kang");
    std::cout << "Search by name (Kang): " << (result3 ? "Found" : "Not found") << std::endl;

    Student* result4 = list4.findStudentByID(9999);
    std::cout << "Search by ID (9999): " << (result4 ? "Found" : "Not found") << std::endl;

    std::cout << "\n Test Case 5: Varying Number of Scores \n";
    double sA[] = {90.0, 85.0};
    double sB[] = {88.0, 77.0, 66.0, 55.0, 44.0};
    double sC[] = {};

    Student stuA("Kim", 3001, sA, 2);
    Student stuB("Lee", 3002, sB, 5);
    Student stuC("Park", 3003, nullptr, 0);

    StudentList list5;
    list5.addStudent(stuA);
    list5.addStudent(stuB);
    list5.addStudent(stuC);

    list5.printAllStudents();

    std::cout << "\nAll test cases completed successfully.\n";
    return 0;
}
