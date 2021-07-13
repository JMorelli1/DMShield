import React from "react";
import HealthBar from "./HealthBar";
import { render } from "@testing-library/react";

const mockDispatch = jest.fn().mockReturnValue(null);

describe("HealthBar", () => {

  describe('basic form rendering', () => {

    beforeEach(async () => {
      render(<HealthBar />)
    })
  })
});
