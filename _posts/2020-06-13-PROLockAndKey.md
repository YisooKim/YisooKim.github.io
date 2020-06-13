---
layout: post
title: "[문제풀이] 프로그래머스 자물쇠와 열쇠"
author : soo
tags: [Algorithm, Programmers]
category: Algorithm
---

### 프로그래머스 자물쇠와 열쇠

[문제링크](https://programmers.co.kr/learn/courses/30/lessons/60059)


### 문제 해설

이 문제는 시뮬레이션, 구현 문제라고 생각한다.  

특별한 알고리즘보다는 모든 경우를 확인하면 되는 문제이다.  

문제의 해결 포인트는 
- 키를 4방향으로 돌린다.
- 돌린 키를 lock과 조금이라도 겹치게 해서 맞춰본다.
- 돌기끼리 만나면 안된다.

위의 세 포인트를 좀 더 풀어보자.

**1. 키를 4방향으로 돌린다**  
배열을 4방향으로 돌리는 것은 어렵지 않다.  
반복문을 통해 좌표 값을 다른 배열에 넣어주기만 하면 되기 때문이다.

간단하게 살펴보자면 3 x 3 크기의 배열 arr가 있다고 생각하자.  
반시계 방향으로 90도가 돌아간다면 arr의 1행은 new_arr의 1열이 될 것이다.  
수식으로 표현하자면 arr[1][y] => new_arr[y][1]이 될 것이다.  
일반화하자면 N x N 크기의 배열은 arr[x][y] => new_arr[y][(n-1)-x] 이 될 것이다.  

위와 같은 반복문을 모든 좌표에 대해, 그리고 총 3번 반복하면 4방향에 대한 배열을 구할 수 있다.


**2. 돌린 키를 lock과 조금이라도 겹치게 해서 맞춰본다**  
처음에 잘못 생각했던 부분이었다. 

조금이라도 겹치려고 한다면 lock을 중앙에 두고 우측 하단 귀퉁이부터 왼쪽 상단 귀퉁이까지 한 칸이라도 lock과 겹치게 놔두면 된다.   
![img]({{ "/assets/img/posts/post_lock_and_key.jpg" | relative_url}})    
위와 같이 어느 하나라도 겹쳐야 한다.  
이렇게 하기 위해서는 key의 시작 x,y의 좌표가 (0,0)부터 (key_size+lock_size, key_size+lock_size)이어야 한다.  

겹치게 두었다면 4방향을 돌리면서 확인한다. 


**3. 돌기끼리 만나면 안된다**

- 자물쇠의 빈 칸과 열쇠의 빈 칸이 만난다면 합은 0일 것이다.
- 자물쇠의 빈 칸과 열쇠의 돌기가 만난다면 합은 1일 것이다.
- 자물쇠의 돌기와 열쇠의 빈 칸이 만난다면 합은 1일 것이다.
- 자물쇠의 돌기와 열쇠의 돌기가 만난다면 합은 2일 것이다.

결국 합이 1일 경우에만 자물쇠는 풀린다. 


+ 추가로 중요한 것은 자물쇠가 모두 1이라면 어떤 키든 열린다. 이 경우를 미리 처리 해줘야 한다.


### 소스코드
```cpp
#include <string>
#include <vector>
#include <iostream>

// 프로그래머스 level3_자물쇠와-열쇠

using namespace std;

// 1. 키를 4방향 돌리기
// 2. 키를 lock과 겹치는 좌표에서 확인.

vector<vector<vector<int>>> key_list;
int board[70][70];
int key_size, lock_size;

// 1. 회전
void rotate(vector<vector<int>> key){
    for(int i=0;i<4;i++){
        vector<vector<int>> v(key_size,vector<int>(key_size,0));
        key_list.push_back(v);
    }
    key_list[0] = key;
    
    // 반시계방향으로 회전.
    for(int i=1;i<4;i++){
        for(int j = 0;j<key_size;j++){
            for(int k=0;k<key_size;k++){
                 key_list[i][k][key_size-1-j] = key_list[i-1][j][k];
            }
        }
    }
    return;
}

// 키를 자물쇠에 넣기.
void push(vector<vector<int>> key, int x, int y){
    int size = key.size();
    for(int i=0;i<size;i++){
        for(int j=0;j<size;j++){
            board[i+x][j+y] += key[i][j];
        }
    }
    return;
}

// 자물쇠 초기화
void set(vector<vector<int>> lock){
    for(int i=0;i<lock_size;i++){
        for(int j = 0;j<lock_size;j++){
            board[i+key_size][j+key_size] = lock[i][j];
        }
    }
    return;
}

// 키가 맞는 지 확인
bool check(){
    for(int i=0;i<lock_size;i++){
        for(int j=0;j<lock_size;j++){
            if(board[i+key_size][j+key_size] != 1)
                return false;
        }
    }
    return true;
}

bool solution(vector<vector<int>> key, vector<vector<int>> lock) {
    key_size = key.size(), lock_size = lock.size();
    
    rotate(key);
    set(lock);
    if(check())
        return true;
    
    for(int i=0;i<4;i++){
        for(int x=0;x<key_size+lock_size;x++){
            for(int y=0;y<key_size+lock_size;y++){
                set(lock);
                push(key_list[i],x,y);
                if(check())
                    return true;
            }
        }
        
    }
    
    return false;
}


```

