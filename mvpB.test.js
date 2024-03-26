import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.
  
    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

    test ('should throw an error', () => {
      expect(()=> sum()).toThrowError('pass valid numbers')
    })

    test ('should throw error', () => {
      expect(() => sum(2, 'seven')).toThrowError('pass valid numbers')
    })

    test ('should return 4', () => {
      expect(sum(1, 3)).toBe(4)
    })

    test ('should return 3', () => {
      expect(sum('1', 2)).toBe(3)
    })

    test ('should return 13', () => {
      expect(sum('10', '3')).toBe(13)
    })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}


  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module



  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
//   test('you can comment out this test', () => {
//     // expect(true).toBe(false)
//   })
// })

test ('renders a link that reads "Home"', () => {
  render (<HelloWorld />);
  const homeLink = screen.queryByText('Home')
  expect(homeLink).toBeVisible()
})

test ('renders a link that reads "About"', () => {
  render (<HelloWorld />);
  const aboutLink = screen.queryByText('About')
  expect(aboutLink).toBeVisible()
})

test ('renders a link that reads "Blog"', () => {
  render (<HelloWorld />);
  const blogLink = screen.queryByText('Blog')
  expect(blogLink).toBeVisible()
})

test ('renders a header that reads "The Truth"', () => {
  render (<HelloWorld />);
  const truthHeader = screen.queryByText('The Truth')
  expect(truthHeader).toBeVisible()
})

test ('renders a header that reads "JavaScript is pretty awesome"', () => {
  render (<HelloWorld />);
  const javaParaOne = screen.queryByText('JavaScript is pretty awesome')
  expect(javaParaOne).toBeInTheDocument()
})

test ('renders a header that reads "javaScript is pretty"', () => {
  render (<HelloWorld />);
  const javaParaTwo = screen.queryByText('javaScript is pretty awesome', {exact: false})
  expect(javaParaTwo).toBeInTheDocument()
})


function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
