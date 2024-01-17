const { default: NavList } = require('./NavList');

test('NavList rendered', () => {
	jest.fn();
	// 	jest.mock('../../Navlist/NavList', ({ children }) => {});
	render(<NavList items={['gogi']} />);
});
