package com.akshay.cource_generator;

public class App {

	public static void main(String[] args) throws Exception {
		Student s1 = new Student();
		s1.name = "Akshay";
		s1.getMarks(); 

		String eligibleFor = s1.getCourceEligibility();
		System.out.println("\n" + s1.name + " is eligible for " + eligibleFor);
	}

}
