import {render, screen} from '@testing-library/react';
import useSWR from 'swr';
import Kategori from '../../pages/produk';

jest.mock('swr');

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/produk",
            pathname: "",
            query: {},
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            isReady: true,
        };
    },
}));

const mockUseSWR = useSWR as jest.Mock;

beforeEach(() => {
    mockUseSWR.mockReturnValue({
        data: { data: [] },
        error: null,
        isLoading: false,
    });
});

describe("Product Page", () => {
    it("renders the product page", () => {
        const page = render(<Kategori />);
        expect(screen.getByRole("heading", { name: "Daftar Produk" }).textContent).toBe("Daftar Produk");
        expect(page).toMatchSnapshot();
    });
});
