package com.akshay.demo;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class MatrixMultiplicationTest {

	private static void assertMatrixEquals(int[][] m1, int[][] m2) {
		assertEquals(m1.length, m2.length);
		for (int i = 0; i < m1.length; i++) {
			assertArrayEquals(m1[i], m2[i]);
		}
	}

	@Test
	public void whenMultipliedWithIdentityMatShouldReturnSameMat() {
		int[][] m1 = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
		int[][] m2 = { { 1, 0, 0 }, { 0, 1, 0 }, { 0, 0, 1 } };
		assertMatrixEquals(m1, MatrixMultiplicator.multMatrix(m1, m2));
	}

	@Test
	public void whenMultipliedMatShouldReturnCorrectResult() {
		int[][] m1 = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
		int[][] m2 = { { 1, 0, 0 }, { 1, 1, 0 }, { 1, 1, 1 } };
		int[][] m3 = { { 6, 5, 3 }, { 15, 11, 6 }, { 24, 17, 9 } };
		assertMatrixEquals(m3, MatrixMultiplicator.multMatrix(m1, m2));
	}

	@Test
	public void whenMultiplied2By3MatShouldReturnCorrectResult() {
		int[][] m1 = { { 1, 2 }, { 4, 5 }, { 7, 8 } };
		int[][] m2 = { { 1, 0, 0 }, { 0, 0, 1 } };
		int[][] m3 = { { 1, 0, 2 }, { 4, 0, 5 }, { 7, 0, 8 } };
		assertMatrixEquals(m3, MatrixMultiplicator.multMatrix(m1, m2));
	}

	@Test
	public void whenMultiplied3By2MatShouldReturnCorrectResult() {
		int[][] m1 = { { 1, -1, 0 }, { 0, -1, 1 } };
		int[][] m2 = { { 1, 2 }, { 4, 5 }, { 3, 6 } };
		int[][] m3 = { { -3, -3 }, { -1, 1 } };
		assertMatrixEquals(m3, MatrixMultiplicator.multMatrix(m1, m2));
	}

	@Test
	public void whenPassedWrongDimentionMatShouldReturnNull() {
		int[][] m1 = { { 1, 0, 0 }, { 0, 0, 1 } };
		int[][] m2 = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
		assertNull(MatrixMultiplicator.multMatrix(m1, m2));
	}
}
