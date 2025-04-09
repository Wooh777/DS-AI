/******************************************************
 * StudentList.cpp
 ******************************************************/
#include "StudentList.h"
#include <iostream>

// Implement all member functions.

StudentList::StudentList()
    : size(0), capacity(2) {
    studentArray = new Student[capacity];
}


StudentList::StudentList(int initialCapacity)
    : size(0), capacity(initialCapacity) {
    studentArray = new Student[capacity];
}


// Copy constructor (deep copy)
StudentList::StudentList(const StudentList& other)
    : size(other.size), capacity(other.capacity) {
    
    studentArray = new Student[capacity];  // 새 배열 생성

    for (int i = 0; i < size; ++i) {
        studentArray[i] = other.studentArray[i];  // Student의 대입 연산자(깊은 복사) 사용
    }
}


// Assignment operator (deep copy)
StudentList& StudentList::operator=(const StudentList& other) {
    if (this == &other) return *this;  // 자기 자신 대입 방지

    // 기존 배열 메모리 해제
    delete[] studentArray;

    // 새 값으로 복사
    size = other.size;
    capacity = other.capacity;
    studentArray = new Student[capacity];

    for (int i = 0; i < size; ++i) {
        studentArray[i] = other.studentArray[i];  // 깊은 복사
    }

    return *this;
}


StudentList::~StudentList() {
    delete[] studentArray;
}


void StudentList::addStudent(const Student& s) {
    // If size >= capacity, resize
    if (size >= capacity) {
        int newCapacity = capacity * 2;
        Student* newArray = new Student[newCapacity];

        // 기존 데이터 복사
        for (int i = 0; i < size; ++i) {
            newArray[i] = studentArray[i]; // Student의 깊은 복사 수행
        }

        // 기존 배열 해제
        delete[] studentArray;

        // 새 배열로 교체
        studentArray = newArray;
        capacity = newCapacity;
    }

    // Then add student
    studentArray[size] = s; // Student의 대입 연산자 사용됨
    ++size;
}


bool StudentList::removeStudentByID(int id) {
    // 학생 찾기
    int index = -1;
    for (int i = 0; i < size; ++i) {
        if (studentArray[i].getID() == id) {
            index = i;
            break;
        }
    }

    // 못 찾으면 false 반환
    if (index == -1) return false;

    // 배열 재정렬: 뒤에 있는 학생들 앞으로 이동
    for (int i = index; i < size - 1; ++i) {
        studentArray[i] = studentArray[i + 1];
    }

    --size; // 학생 수 감소
    return true;
}


Student* StudentList::findStudentByName(const std::string& name) {
    for (int i = 0; i < size; ++i) {
        if (studentArray[i].getName() == name) {
            return &studentArray[i];
        }
    }
    return nullptr;
}


Student* StudentList::findStudentByID(int id) {
    for (int i = 0; i < size; ++i) {
        if (studentArray[i].getID() == id) {
            return &studentArray[i];
        }
    }
    return nullptr;
}


void StudentList::printAllStudents() const {
    for (int i = 0; i < size; ++i) {
        std::cout << "Student " << i + 1 << ":\n";
        std::cout << "Name: " << studentArray[i].getName() << std::endl;
        std::cout << "ID: " << studentArray[i].getID() << std::endl;
        studentArray[i].printScores(); // Student 클래스에 구현되어 있음
        std::cout << "-----------------------------" << std::endl;
    }

    if (size == 0) {
        std::cout << "No students in the list.\n";
    }
}

