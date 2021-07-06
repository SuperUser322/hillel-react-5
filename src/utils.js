export function pause(ms = 1000) {/////////можно удалить нафиг util.js
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Pause in ${ms}ms has ended.`);
    }, ms);
  })
}

export function* someGenerator() {
  console.log('before yield 1');
  yield 1;
  console.log('after yield 1');
  console.log('before yield 2');
  yield 2;
  console.log('after yield 2');
  console.log('before yield 3');
  yield 3;
  console.log('after yield 4');
  console.log('before return');
  return 4;
}
