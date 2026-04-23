import {render, screen} from '@testing-library/react';
import AboutPage from '../../pages/about';

describe("About Page", () => {
    it("renders the about page", () => {
        const page = render(<AboutPage />);
        expect(screen.getByTestId("title").textContent).toBe("About Page");
        expect(page).toMatchSnapshot();
    });
});




