29km
``` 
tatsumasa_nakano@ip-172-31-2-252:~$ cat learn_sql/csv/dummy.csv | wc -l
10001
```

30km
```
awk -F',' '$6 == "A"' learn_sql/csv/dummy.csv | wc -l
3825
```

```
awk -F',' '$3 >= 30 && $3 < 40' learn_sql/csv/dummy.csv | wc -l
1667
```

```
awk -F',' '$7 ~ /@example.co.jp/' learn_sql/csv/dummy.csv | wc -l
1715
```

31km
```
head -n 1001 learn_sql/csv/dummy.csv > learn_sql/csv/dummy_1.csv

cat learn_sql/csv/dummy_1.csv | wc -l
1001
```
```
sed -i 's/北海道/埼玉県/g' learn_sql/csv/dummy_1.csv
```
```
mv /home/tatsumasa_nakano/learn_sql/c
sv/tatsumasa_nakano.csv /tmp/
```

32km
```
select count(*) from PersonalInformation;
 count
-------
 10000
(1 row)
```

33km
```
 SELECT COUNT(*) FROM PersonalInformation WHERE blood_type = 'A';
 count
-------
  3825
(1 row)
```
```
SELECT COUNT(*) FROM PersonalInformation WHERE age >=
30 AND age < 40;
 count
-------
  1667
(1 row)
```
```
SELECT COUNT(*) FROM PersonalInformation WHERE email L
IKE '%@example.co.jp';
 count
-------
  1715
(1 row)
```

34km
```
SELECT age,gender,COUNT(*) AS count FROM PersonalInfor
mation GROUP BY age,gender ORDER BY age,gender;
```
SELECT name, credit_card_expiration_date FROM PersonalInformation ORDER BY credit_card_expiration_date ASC LIMIT 1;
    name     | credit_card_expiration_date
-------------+-----------------------------
 山下 美由紀 | 2023-01-24
(1 row)
```
```
SELECT FLOOR(age / 10) * 10 AS decade, ROUND(AVG(age), 2) AS average_age FROM PersonalInformation GROUP BY FLOOR(age / 10) ORDER B
Y decade;
 decade | average_age
--------+-------------
     20 |       24.56
     30 |       34.42
     40 |       44.56
     50 |       54.51
     60 |       64.35
     70 |       74.52
     80 |       80.00
(7 rows)
```

35km
```
SELECT name, age, blood_type, my_number FROM (SELECT name, age, blood_type, my_number, ROW_NUMBER() OVER (PARTITION BY blood_type ORDER BY age DESC, my_number DESC) AS rn FROM PersonalInformation) AS ranked_data WHERE rn <= 3 AND age = (SELECT MAX(age) FROM PersonalInformation AS t2 WHERE t2.blood_type = ranked_data.blood_type) ORDER BY blood_type, my_numb
er DESC;
    name     | age | blood_type |  my_number
-------------+-----+------------+--------------
 加藤 由実   |  80 | A          | 971143000000
 兼田 英紀   |  80 | A          | 890153000000
 石井 沙樹   |  80 | A          | 878632000000
 山名 一樹   |  80 | AB         | 895331000000
 阿部 博和   |  80 | AB         | 798830000000
 木村 裕子   |  80 | AB         | 723942000000
 杉浦 朋宏   |  80 | B          | 999715000000
 矢田 めぐみ |  80 | B          | 998540000000
 足立 渉     |  80 | B          | 998148000000
 五十嵐 淳   |  80 | O          | 994010000000
 西脇 美穂   |  80 | O          | 959063000000
 中川 梨華   |  80 | O          | 952747000000
(12 rows)
```
