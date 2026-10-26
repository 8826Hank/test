// 練習資料；修改文章與程式展示內容後，記得一起更新 code/ 裡的原始檔。
window.LESSONS = [
  {
    "id": "threads-and-mutex",
    "category": "experiment",
    "date": "2026-10-26",
    "language": "C++",
    "title": "從六秒到三秒：多執行緒與互斥鎖",
    "summary": "比較一般函式呼叫與建立執行緒，理解 join、排程與輸出同步。",
    "source": "code/thread_first_try.cpp",
    "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nmutex output_mutex;\n\nvoid work(const char* name){\n    {\n        lock_guard<mutex> guard(output_mutex);\n        cout << name << \"開始\\n\" << endl;\n    } // 離開這個區塊，guard 自動解鎖\n\n    // 等待時沒有持有 mutex，另一個工作依然能繼續\n    this_thread::sleep_for(chrono::seconds(3));\n\n    {\n        lock_guard<mutex> guard(output_mutex);\n        cout << name << \"完成\\n\";\n    }\n}\n\nint main()\n{\n    auto start = chrono::steady_clock::now();\n    thread a(work, \"A\");\n    thread b(work, \"B\");\n    a.join();\n    b.join();\n    auto end = chrono::steady_clock::now();\n    double sec = chrono::duration<double>(end - start).count();\n    cout << \"總時間\" << sec << \"秒\\n\" << endl;\n    return 0;\n}",
    "sections": [
      {
        "title": "一般呼叫，不會自動開執行緒",
        "text": "直接依序呼叫 work(\"A\") 和 work(\"B\") 時，是主執行緒自己做完 A，再做 B。兩次三秒等待相加，總耗時約六秒。"
      },
      {
        "title": "先啟動兩個工作，再等待",
        "text": "std::thread a(work, \"A\") 建立並啟動執行緒；B 也啟動後，兩段等待可以重疊。join() 等待工作完成，不是啟動工作。這個例子約三秒，是因為等待重疊，不能推論所有計算工作都會快兩倍。"
      },
      {
        "title": "先建立 A，為什麼可能 B 先印？",
        "text": "建立順序不保證列印順序，實際排程由作業系統決定。跑一百次可能出現不同順序，也可能都相同。每個工作內仍會先印開始、再印完成。"
      },
      {
        "title": "一把共用鎖，保護完整輸出",
        "text": "兩個工作共用 output_mutex。lock_guard 在建立時取得鎖，離開所在區塊時自動解鎖。鎖住每次完整輸出，避免文字交錯；鎖本身不保證 A 先取得。三秒休眠放在保護區外，才能保留等待重疊的效果。"
      },
      {
        "title": "chrono 在做什麼？",
        "text": "chrono 用來表示時間點與時間長度。steady_clock::now() 記錄適合計時的時間點；結束減去開始，再轉成以秒為單位的 duration，就能取得總耗時。"
      }
    ]
  },
  {
    "id": "python-tree-basics",
    "category": "tree",
    "date": "2026-10-26",
    "language": "Python",
    "title": "二元樹入門：建立節點、計算節點數與樹高",
    "summary": "保留本次完成的 Python 程式，從物件連結理解遞迴：節點數用左右相加，樹高取左右最大值。",
    "source": "code/tree_basics.py",
    "code": "class Node():\n    def __init__(self , value , left=None,right = None):\n        self.value = value\n        self.left = left\n        self.right = right\n    \n    def R_son(self , son):\n        self.right = son\n    \n    def L_son(self , son):\n        self.left = son\n    \n    def count_Node(self):\n        L_count = 0\n        R_count = 0\n\n        if(self.left != None):\n            L_count = self.left.count_Node()\n        if(self.right != None):\n            R_count = self.right.count_Node()\n        return L_count + R_count + 1\n    \n    def height(self):\n        L_height = 0\n        R_height = 0\n\n        if self.right != None:\n            R_height = self.right.height()\n        if self.left != None:\n            L_height = self.left.height()\n        return  1 + max(L_height ,R_height) \n\nroot = Node(10,\n            left = Node(5,left = Node(3),right = Node(7)),\n            right = Node(20))\n\nprint(root.value)             # 10\nprint(root.right.value)       # 20\nprint(root.left.right.value)  # 7\nprint(root.right.left)        # None\nprint(3*'----')\nprint(root.count_Node())       # 5\nprint(root.left.count_Node())  # 3\nprint(3*'----')\nprint(root.height())             # 3\nprint(root.left.height())        # 2\nprint(root.right.height())       # 1\nprint(root.left.left.height())   # 1\n'''\nprint(root.value)\nprint(root.left.right.value)\nprint(root.right.left)\n'''\n",
    "diagram": "        10\n       /  \\\n      5    20\n     / \\\n    3   7",
    "output": "10\n20\n7\nNone\n------------\n5\n3\n------------\n3\n2\n1\n1",
    "sections": [
      {
        "title": "本次進度與高度定義",
        "text": "已完成普通二元樹的節點建立、左右連結、節點計數與樹高。這裡以層數定義高度：葉節點為 1，圖中的整棵樹為 3。若其他教材以邊數定義高度，葉節點是 0，同一棵樹會得到 2。尚未實作走訪、搜尋樹、平衡調整或繼承版本。"
      },
      {
        "title": "Node 是節點，數字是節點裡的值",
        "text": "Node(20) 建立一個具有 value、left、right 的物件；20 和 (20) 都只是整數。孩子位置應連到 Node 物件或 None。Node(5, 3, 7) 雖可建立物件，但把整數放進孩子欄位，之後無法對它呼叫 .height() 或存取 .value。"
      },
      {
        "title": "用預設參數簡潔建樹",
        "text": "__init__(self, value, left=None, right=None) 讓沒有提供孩子的節點自動以 None 初始化。把 Node(3)、Node(7) 放進 Node(5) 的左右參數，即可在建立時接好樹。left= 與 right= 是關鍵字參數，可清楚標明方向。"
      },
      {
        "title": "self 與實例方法",
        "text": "self 是呼叫方法的那個節點。root.L_son(child) 會自動把 root 當作 self，child 當作 son。呼叫 Node.L_son(child) 沒有提供完整參數。self.left 與 self.Left 也是兩個不同屬性，大小寫必須一致。R_son 與 L_son 在本次程式中保留，也可以直接用 node.right = child 或 node.left = child。"
      },
      {
        "title": "節點數：左邊加右邊，再加自己",
        "text": "count_Node() 先將 L_count、R_count 設為 0；有孩子時才遞迴取得孩子子樹的節點數，最後回傳 L_count + R_count + 1。節點 5 的左側有 1 個、右側有 1 個，加上自己共 3 個；根節點則是 3 + 1 + 1 = 5。"
      },
      {
        "title": "樹高：較深的一側，再加自己這層",
        "text": "height() 把空缺那側的高度當作 0，再回傳 1 + max(L_height, R_height)。節點 5 得到 1 + max(1, 1) = 2；根節點得到 1 + max(2, 1) = 3。高度是在找最長的根到葉路徑所包含的節點數，左右高度不能相加。"
      },
      {
        "title": "遞迴必須往孩子前進",
        "text": "在 height() 內再次呼叫 self.height()，仍然處理同一個節點，沒有縮小問題，會持續遞迴直到 Python 的遞迴深度限制。self.left.height() 與 self.right.height() 才是往更小的子樹前進；但必須先確認該孩子不是 None。"
      },
      {
        "title": "為什麼 or 條件不能保證兩側都有孩子？",
        "text": "條件 left 存在 or right 存在，只能保證至少一側存在。如果隨後直接呼叫兩側的方法，缺少的那側仍會出錯。本次版本分別檢查左右孩子，就能處理葉節點、只有左孩子、只有右孩子和兩側都有孩子四種情況。and、or 是邏輯運算，&、| 是位元運算。"
      },
      {
        "title": "None 與遞迴終止條件",
        "text": "判斷空孩子，慣用 self.left is not None，比 != None 更直接。你的本次版本可以正常運作。葉節點兩側都不進入遞迴，兩個計數或高度保持為 0，自然回傳 1，不必另外判斷葉節點。若整棵樹的 root 本身是 None，不能呼叫 root.height()；空樹的處理可在之後用外部函式或包裝類別補上。"
      },
      {
        "title": "複雜度如何推導？",
        "text": "令 n 為這次呼叫所涵蓋的子樹節點數，h 為該子樹以層數計的高度。計數與高度都會走訪每個節點一次，每個節點只做常數次比較與加法，因此時間是 O(n)。遞迴堆疊同時保存的是目前路徑，額外空間為 O(h)：平衡時 O(log n)，退化成單鏈時 O(n)。節點本身的 O(n) 儲存空間與遞迴額外空間要分開計算。"
      },
      {
        "title": "目前保留的寫法與後續整理",
        "text": "本頁保留你交來的完整版本，包括方法名稱、連接方法與練習輸出。未來可把 count_Node 改成 count_nodes、L_height/R_height 改成 left_height/right_height，統一 Python 命名與排版，但這些不改變演算法複雜度。繼承版本留待基本操作熟練後再加入。"
      }
    ],
    "complexity": [
      [
        "建立一個 Node",
        "O(1)",
        "O(1)",
        "存入值與兩個孩子的參照，不複製子樹。"
      ],
      [
        "建立 n 個節點的樹",
        "O(n)",
        "O(n) 節點儲存",
        "每個節點建立一次。"
      ],
      [
        "L_son / R_son",
        "O(1)",
        "O(1)",
        "改變一個孩子參照。"
      ],
      [
        "count_Node()",
        "O(n)",
        "O(h) 遞迴堆疊",
        "每個節點處理一次，保留目前遞迴路徑。"
      ],
      [
        "height()",
        "O(n)",
        "O(h) 遞迴堆疊",
        "比較左右子樹高度，仍需走訪所有節點。"
      ]
    ],
    "reviewQuestions": [
      "先複習：節點計數使用左右相加，樹高使用左右最大值。",
      "下一題可練前序、中序、後序走訪，觀察每個節點被列印的順序。",
      "繼承版本與二元搜尋樹尚未開始，之後再接續。"
    ]
  }
];
