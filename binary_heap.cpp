#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

class MaxHeap
{
    public:
        vector <int> heap;
    
        void heapifyDown(int index){
            int n = heap.size();
            int largest = index;     // 爹(max)
            int left = 2 * index+1;    // 左兒
            int right = 2 * index+2; // 右兒

            // 當 左兒子比爹還大
            if(left < n && heap[left] > heap[largest]) largest = left;
            // 當右兒子比爹還大
            if(right < n && heap[right] > heap[largest]) largest = right;
        
            if(largest != index){
                swap(heap[index] , heap[largest]);
                heapifyDown(largest); // 向下檢查
            }
        }
        
        void build(vector<int> arr)
        {
            heap = arr;
            for(int i=arr.size()/2-1 ; i>=0;i--)
                heapifyDown(i);
        }
};

void printHeap(const vector <int> array)
{
    for(int i:array)
        cout << i << " ";
    cout << endl;
}

int main() {
    vector<int> data = {3, 5, 8, 1, 2, 9, 4, 7, 6};
    
    cout << "原始陣列: ";
    printHeap(data);

    MaxHeap maxheap;
    
    maxheap.build(data);

    cout << "建立後的最大堆積 (Max Heap): ";
    printHeap(maxheap.heap);

    return 0;
}