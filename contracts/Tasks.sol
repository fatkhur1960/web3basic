// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Tasks {
    string[] todos;
    string tasks;
    function getTasks() public view returns (string[] memory) {
        return (todos);
    }

    function setTasks(string memory _task) public {
        todos.push(_task);
    }
}
