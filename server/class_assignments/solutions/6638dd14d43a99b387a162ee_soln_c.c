
#include <stdio.h>
int count(int coins[], int n, int sum)
{
	if (sum == 0)
		return 1;

	// If sum is less than 0 then no
	// solution exists
	if (sum < 0)
		return 0;

	// If there are no coins and sum
	// is greater than 0, then no
	// solution exist
	if (n <= 0)
		return 0;
	return count(coins, n - 1, sum)
		+ count(coins, n, sum - coins[n - 1]);
}

// Driver program to test above function
int main()
{
	int i, j;
	int coins[] = { 1, 2, 3 };
	int n = sizeof(coins) / sizeof(coins[0]);
	printf("%d ", count(coins, n, 5));
	getchar();
	return 0;
}
