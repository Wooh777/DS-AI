/******************************************************
 * Student.h
 ******************************************************/
#ifndef STUDENT_H
#define STUDENT_H

#include <string>

class Student {
private:
    std::string name;
    int id;
    double* scores;
    int numberOfScores;

public:
    // Default constructor
    Student();

    // Parameterized constructor
    Student(const std::string& name, int id, const double* scores, int scoreCount);

    // Copy constructor
    Student(const Student& other);

    // Assignment operator
    Student& operator=(const Student& other);

    // Destructor
    ~Student();

    // Getter functions
    std::string getName() const;
    int getID() const;
    int getNumberOfScores() const;
    double getScore(int index) const;

    // Print scores or other info
    void printScores() const;

    // You can add additional methods here as needed
};

#endif
