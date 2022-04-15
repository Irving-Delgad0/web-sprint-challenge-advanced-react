import React from "react"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AppFunctional from "./AppFunctional"

// // Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

test("AppFunctional renders correctly", () => {
  render(<AppFunctional />)
})

// test("Renders error message when submit button is clicked without entering email", async () => {
//   render(<AppFunctional />)

//   const submit = screen.getByTestId("submit")
//   userEvent.click(submit)

//   const errorMessage = await screen.findByText(/ouch: email is required/i)
//   expect(errorMessage).toBeInTheDocument
// })

test("Renders the Welcome to GRID header", () => {
  render(<AppFunctional />)

  const header = screen.queryByText(/welcome to the grid/i)
  expect(header).toBeInTheDocument
  expect(header).toBeTruthy;
})