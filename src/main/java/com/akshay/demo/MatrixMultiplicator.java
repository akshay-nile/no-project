package com.akshay.demo;

public class MatrixMultiplicator {

	public static int[][] multMatrix(int[][] m1, int[][] m2) {
		int m1Rows = m1.length, m1Cols = m1[0].length;
		int m2Rows = m2.length, m2Cols = m2[0].length;

		if (m1Rows != m2Cols) {
			System.out.println("Multiplication not possible...!");
			return null;
		}

		int[][] m3 = new int[m1Rows][m2Cols];

		for (int x = 0; x < m1Rows; x++) {
			for (int y = 0; y < m2Cols; y++) {
				int sum = 0;
				for (int i = 0; i < m1Cols && i < m2Rows; i++) {
					sum += m1[x][i] * m2[i][y];
				}
				m3[x][y] = sum;
			}
		}

		return m3;
	}

}
