// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestToken is ERC20, ERC20Burnable, ERC20Permit {
    uint8 overriddenDecimals;

    constructor(
        string memory name,
        string memory symbol,
        uint8 _decimals
    ) ERC20(name, symbol) ERC20Permit(name) {
        overriddenDecimals = _decimals;
    }

    function decimals() public view override returns (uint8) {
        return overriddenDecimals;
    }

    function mint(address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }
}
