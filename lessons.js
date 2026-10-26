// 新增練習時，在這個陣列加入一筆；category 可用 tree、heap、queue、stack、experiment。
window.LESSONS = [{
  id: 'threads-and-mutex', category: 'experiment', date: '2026-10-26', language: 'C++',
  title: '從六秒到三秒：多執行緒與互斥鎖',
  summary: '比較一般函式呼叫與建立執行緒，理解 join、排程與輸出同步。',
  source: 'code/thread_first_try.cpp',
  code: `#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>
using namespace std;

mutex output_mutex;

void work(const char* name){
    {
        lock_guard<mutex> guard(output_mutex);
        cout << name << "開始\\n" << endl;
    } // 離開這個區塊，guard 自動解鎖

    // 等待時沒有持有 mutex，另一個工作依然能繼續
    this_thread::sleep_for(chrono::seconds(3));

    {
        lock_guard<mutex> guard(output_mutex);
        cout << name << "完成\\n";
    }
}

int main()
{
    auto start = chrono::steady_clock::now();
    thread a(work, "A");
    thread b(work, "B");
    a.join();
    b.join();
    auto end = chrono::steady_clock::now();
    double sec = chrono::duration<double>(end - start).count();
    cout << "總時間" << sec << "秒\\n" << endl;
    return 0;
}`,
  sections: [
    {title:'一般呼叫，不會自動開執行緒',text:'直接依序呼叫 work("A") 和 work("B") 時，是主執行緒自己做完 A，再做 B。兩次三秒等待相加，總耗時約六秒。'},
    {title:'先啟動兩個工作，再等待',text:'std::thread a(work, "A") 建立並啟動執行緒；B 也啟動後，兩段等待可以重疊。join() 等待工作完成，不是啟動工作。這個例子約三秒，是因為等待重疊，不能推論所有計算工作都會快兩倍。'},
    {title:'先建立 A，為什麼可能 B 先印？',text:'建立順序不保證列印順序，實際排程由作業系統決定。跑一百次可能出現不同順序，也可能都相同。每個工作內仍會先印開始、再印完成。'},
    {title:'一把共用鎖，保護完整輸出',text:'兩個工作共用 output_mutex。lock_guard 在建立時取得鎖，離開所在區塊時自動解鎖。鎖住每次完整輸出，避免文字交錯；鎖本身不保證 A 先取得。三秒休眠放在保護區外，才能保留等待重疊的效果。'},
    {title:'chrono 在做什麼？',text:'chrono 用來表示時間點與時間長度。steady_clock::now() 記錄適合計時的時間點；結束減去開始，再轉成以秒為單位的 duration，就能取得總耗時。'}
  ]
}];
