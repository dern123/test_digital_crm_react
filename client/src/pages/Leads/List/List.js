import { useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';

const List = () => {
  const { loading, request, error, clearError } = useHttp();
const arr = [1,2,3,4,5];
const arr1 = [17,19,21];
const arr2 = [5,5,5];
  const getLeads = useCallback(async () => {
    try {
      const data = await request('/api/leads/get', 'GET', null, {});
      console.log('🚀 ~ List ~ getLeads ~ data:', data);
    } catch (e) {
      console.error(e);
    }
  }, [request]);

//   const promiseExample = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const randomNumber = Math.random();
//       if (randomNumber > 0.5) {
//         resolve(randomNumber);
//       } else {
//         reject('Error: Too small!');
//       }
//     }, 1000);
//   });

  // const count = (nums) => {
  //   let num_count = 0;
  //   for (let i = 0; i < nums.length; i++) {
  //     if(nums[i] % 2 != 0){
  //       if(nums[i] == 5){
  //         num_count += 5;
  //       }else{
  //         num_count += 3;
  //       }
  //     }
  //     else{
  //       num_count += 1;
  //     }
  //   }
  //   console.log("num_count:", num_count)
  //   return num_count;
  // }

  // let company = { // той же об’єкт, стиснутий для компактності
  //   sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  //   development: {
  //     sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
  //     internals: [{name: 'Jack', salary: 1300}]
  //   }
  // };
  
  // // Функція для підрахунку суми зарплат
  // function sumSalaries(department) {
  //   if (Array.isArray(department)) { // випадок (1)
  //     return department.reduce((prev, current) => prev + current.salary, 0); // сума масиву
  //   } else { // випадок (2)
  //     let sum = 0;
  //     for (let subdep of Object.values(department)) {
  //       sum += sumSalaries(subdep); // рекурсивно викликається для підвідділів, суммуючи результат
  //     }
  //     return sum;
  //   }
  // }
  
  // alert(sumSalaries(company)); // 7700
  // count(arr);
  // count(arr1);
  // count(arr2);

  // function* generateFibancci(n){ 
  //   let num1 = 0;
  //   let num2 = 1;
  //   for(let i = 0; i < n ; i++){
  //       yield num2;
  //       [num1, num2] = [num2, num1 + num2];
  //   }
  // }
  // function fibanacci(n){
  //   const result = [];
  //   const gen = generateFibancci(n);
  //   for(let j = 0 ; j < n ; j++) {
  //     result.push(gen.next().value);
  //   }
  //   return result;
  // }
  // console.log("🚀 fibanacci(8):", fibanacci(15));
  // console.log("🚀 fibanacci(8):", fibanacci(10));
  // console.log("🚀 fibanacci(8):", fibanacci(6));

  // function* generateFibancci(n, result = [0, 1]){ 
  //     if ( n <= 0) {
  //       return result;
  //     }
  //     else {
  //       const values = result[result.length - 1] + result[result.length - 2]
  //       yield values;
  //       yield* generateFibancci(n - 1, [...result, values]);
  //     }
  // }
  // function fibanacci(n){
  //   const result = [];
  //   const generator = generateFibancci(n);
  
  //   for (const value of generateFibancci(n)) {
  //     result.push(value);
  //   }
  
  //   return result;
  // }
  // console.log("🚀 fibanacci(8):", fibanacci(15));
  // console.log("🚀 fibanacci(8):", fibanacci(10));
  // console.log("🚀 fibanacci(8):", fibanacci(6));
  // function fibonacciRecursive(n) {
  //   if (n <= 0) {
  //     return [];
  //   }
  
  //   if (n === 1) {
  //     return [0];
  //   }
  
  //   if (n === 2) {
  //     return [0, 1];
  //   }
  
  //   const result = fibonacciRecursive(n - 1);
  //   result.push(result[result.length - 1] + result[result.length - 2]);
  
  //   return result;
  // }
  // console.log("🚀 fibonacciRecursive(8):", fibonacciRecursive(8));

  useEffect(() => {
    getLeads();
    // promiseExample
    // .then(result => console.log('Fulfilled:', result))
    // .catch(error => console.error('Rejected:', error));
  }, [getLeads]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <h1>Leads</h1>
      </div>
    </>
  );
};

export default List;