package com.akshay.cource_generator;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

enum Subject {
	HTML, SQL, Java, CSS, JavaScript, Python
}

public class Student {

	private static final Set<Subject> javaFullStack = new HashSet<>();
	private static final Set<Subject> pythonFullStack = new HashSet<>();
	private static final Set<Subject> frontendDesign = new HashSet<>();
	private static final Set<Subject> frontendDevelopment = new HashSet<>();
	private static final Set<Subject> javaBackendDevelopment = new HashSet<>();
	private static final Set<Subject> pythonBackendDevelopment = new HashSet<>();

	static {
		javaFullStack.add(Subject.HTML);
		javaFullStack.add(Subject.CSS);
		javaFullStack.add(Subject.JavaScript);
		javaFullStack.add(Subject.SQL);
		javaFullStack.add(Subject.Java);

		pythonFullStack.add(Subject.HTML);
		pythonFullStack.add(Subject.CSS);
		pythonFullStack.add(Subject.JavaScript);
		pythonFullStack.add(Subject.SQL);
		pythonFullStack.add(Subject.Python);

		frontendDevelopment.add(Subject.HTML);
		frontendDevelopment.add(Subject.CSS);
		frontendDevelopment.add(Subject.JavaScript);
		frontendDevelopment.add(Subject.SQL);

		frontendDesign.add(Subject.HTML);
		frontendDesign.add(Subject.CSS);
		frontendDesign.add(Subject.JavaScript);

		pythonBackendDevelopment.add(Subject.Python);
		pythonBackendDevelopment.add(Subject.SQL);

		javaBackendDevelopment.add(Subject.Java);
		javaBackendDevelopment.add(Subject.SQL);
	}

	private Map<Subject, Integer> marks = new HashMap<>();
	public String name;

	public void getMarks() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter percentage of marks for " + name + " as asked below.\n");
		for (Subject sub : Subject.values()) {
			System.out.print("Enter marks for " + sub + ": ");
			marks.put(sub, sc.nextInt());
		}

		sc.close();
	}

	public String getCourceEligibility() {
		Set<Subject> skillSet = new HashSet<>();

		for (Subject sub : marks.keySet()) {
			if (marks.get(sub) > 60)
				skillSet.add(sub);
		}

		if (skillSet.containsAll(javaFullStack))
			return "Java Fullstack Development";

		if (skillSet.containsAll(pythonFullStack))
			return "Python Fullstack Development";

		if (skillSet.containsAll(frontendDesign))
			return "Frontend Designing";

		if (skillSet.containsAll(frontendDevelopment))
			return "Frontend Development";

		if (skillSet.containsAll(javaBackendDevelopment))
			return "Java Backend Development";

		if (skillSet.containsAll(pythonBackendDevelopment))
			return "Python Backend Development";

		return "Basic Training";
	}
}
