import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

import App from '../App';
import Welcome from '../components/Welcome';


describe("App", () => {
  //testcase name should not contain capital and space
  test("renders_app_component_with_content", () => {
    render(<App />);
    expect(screen.getByText("Neo Players")).toBeInTheDocument();
  });
}
)

describe("Welcome", () => {
  test("renders_welcome_component_with_content_1", () => {
    render(<Welcome name="Sara" />);
    expect(screen.getByText("Sara")).toBeInTheDocument();
  });
  test("renders_welcome_component_with_content_2", () => {
    render(<Welcome name="Chahal" />);
    expect(screen.getByText("Chahal")).toBeInTheDocument();
  });
  test("renders_welcome_component_with_content_3", () => {
    render(<Welcome name="Phillips" />);
    expect(screen.getByText("Phillips")).toBeInTheDocument();
  });
  test("renders_welcome_component_with_content_4", () => {
    render(<Welcome name="Sanjay" />);
    expect(screen.getByText("Sanjay")).toBeInTheDocument();
  }
  );
  test("renders_welcome_component_with_content_5", () => {
    render(<Welcome name="Ragul" />);
    expect(screen.getByText("Ragul")).toBeInTheDocument();
  }
  );
}
)
 