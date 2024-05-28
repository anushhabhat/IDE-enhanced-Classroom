#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void findTriplets(vector<int>& arr) {
    int n = arr.size();
    bool found = false;

    // Sort the array
    sort(arr.begin(), arr.end());

    // Fix the first element and find other two elements
    for (int i = 0; i < n - 2; ++i) {
        int left = i + 1;
        int right = n - 1;
        int x = arr[i];

        while (left < right) {
            if (x + arr[left] + arr[right] == 0) {
                cout << x << " " << arr[left] << " " << arr[right] << endl;
                found = true;
                ++left;
                --right;
            } else if (x + arr[left] + arr[right] < 0) {
                ++left;
            } else {
                --right;
            }
        }
    }

    if (!found) {
        cout << "No triplets found" << endl;
    }
}

int main() {
    vector<int> arr =  {1, -2, 1, 0, 5};
    findTriplets(arr);
    return 0;
}
