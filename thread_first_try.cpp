#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>
using namespace std;

mutex output_mutex;

void work(const char* name){
    {
        lock_guard<mutex> guard(output_mutex);
        cout << name << "開始\n" << endl;
    } // 離開這個區塊，guard 自動解鎖
    
    // 等待時沒有持有mutex，另一個工作依然能繼續
    this_thread::sleep_for(chrono::seconds(3));

    {
        lock_guard<mutex> guard(output_mutex);
        cout << name << "完成\n";
    }
    
}

int main()
{
    auto start = chrono::steady_clock::now();
    
    thread a(work,"A");
    thread b(work,"B");

    a.join();
    b.join();

    auto end = chrono::steady_clock::now();
    double sec = chrono::duration<double>(end - start).count();

    cout << "總時間" << sec << "秒\n" << endl;
    return 0;
}
