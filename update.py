#!/usr/bin/python3

import subprocess
import os

# navigate to the directory where the Git repository is located
path_to_repo = 'C:/Users/reave/OneDrive/Desktop/Sports-Odds'
os.chdir(path_to_repo)

# execute another Git command
subprocess.run(['git', 'add', '.'])

# execute a Git command that requires input from the user
commit_msg = "Updated CSV"
subprocess.run(['git', 'commit', '-m', commit_msg])

# execute a Git command with options
subprocess.run(['git', 'push'])

message = "Everything should be up to date now"

print(message)

