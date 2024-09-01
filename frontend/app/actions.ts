'use server'

export async function onClick() {
  console.log('paso')

  try {
    const res = await fetch('http://127.0.0.1:3000/api/p');
    const arr = await res.json();
    console.log(arr)
  } catch (error) {
    console.log(error)
  }
}