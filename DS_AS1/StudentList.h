/******************************************************
 * StudentList.h
 ******************************************************/
#ifndef STUDENTLIST_H
#define STUDENTLIST_H

#include "Student.h"

class StudentList {
private:
    Student* studentArray;  // pointer to dynamic array of Students
    int size;               // current number of students stored
    int capacity;           // current capacity of the array

    // (Optional) a helper function to resize the array
    // void resize(int newCapacity);

public:
    // Constructors
    StudentList();
    StudentList(int initialCapacity);

    // Copy constructor
    StudentList(const StudentList& other);

    // Assignment operator
    StudentList& operator=(const StudentList& other);

    // Destructor
    ~StudentList();

    // Add a new student
    void addStudent(const Student& s);

    // Remove a student by ID
    bool removeStudentByID(int id);

    // Find student by name
    Student* findStudentByName(const std::string& name);

    // Find student by ID
    Student* findStudentByID(int id);

    // Print all students
    void printAllStudents() const;

};

#endif  // STUDENTLIST_H
