/******************************************************
 * Student.cpp
 ******************************************************/
#include "Student.h"
#include <iostream>

// Implement all constructors, destructor, copy constructor, etc.

Student::Student()
    : name(""), id(0), scores(nullptr), numberOfScores(0) {
    // Implementation
}

Student::Student(const std::string& name, int id, const double* scores, int scoreCount)
    : name(name), id(id), numberOfScores(scoreCount) {
    
    if (scoreCount > 0 && scores != nullptr) {
        this->scores = new double[scoreCount];
        for (int i = 0; i < scoreCount; ++i) {
            this->scores[i] = scores[i];
        }
    } else {
        this->scores = nullptr;
    }
}


Student::Student(const Student& other)
    : name(other.name), id(other.id), numberOfScores(other.numberOfScores) {
    
    if (other.scores != nullptr && numberOfScores > 0) {
        scores = new double[numberOfScores]; 
        for (int i = 0; i < numberOfScores; ++i) {
            scores[i] = other.scores[i];     
        }
    } else {
        scores = nullptr;
    }
}


Student& Student::operator=(const Student& other) {
    if (this == &other) return *this;  // 자기 자신 대입 방지

    // 기존 scores 배열 해제
    delete[] scores;

    // 얕은 멤버 복사
    name = other.name;
    id = other.id;
    numberOfScores = other.numberOfScores;

    // 깊은 복사
    if (other.scores != nullptr && numberOfScores > 0) {
        scores = new double[numberOfScores];
        for (int i = 0; i < numberOfScores; ++i) {
            scores[i] = other.scores[i];
        }
    } else {
        scores = nullptr;
    }

    return *this;
}


Student::~Student() {
    delete[] scores;
}


// Implement getters and printScores methodss
std::string Student::getName()const{
    return name;
}

int Student::getID() const{
    return id;
}

int Student::getNumberOfScores() const {
    return numberOfScores;
}

double Student::getScore(int index) const {
    if (index >= 0 && index < numberOfScores) {
        return scores[index];
    } else {
        // 잘못된 인덱스일 경우 -1.0 또는 예외 처리
        std::cerr << "Invalid score index: " << index << std::endl;
        return -1.0;
    }
}

void Student::printScores() const {
    std::cout << "Scores: ";
    for (int i = 0; i < numberOfScores; ++i) {
        std::cout << scores[i] << " ";
    }
    std::cout << std::endl;
}
