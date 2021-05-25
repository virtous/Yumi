# Import the os and sys lib
import os, sys, time

# First, we fetch and pull from our remote
print('[1]: Fetching and pulling from remote repo...')
os.system('git fetch -q')
os.system('git pull -q')
print('[1]: Done')

# Next, we add the changes and commit them
print('\n[2]: Adding changes...')
os.system('git add .')
os.system('git commit -m "{}" -q'.format(str(input('[2]: Please enter your commit message\n[2]: '))))
print('[2]: Done')

# Lastly, we push the changes
print('\n[3]: Pushing changes...')
os.system('git push -q')
print('[3]: Done')

time.sleep(3)
sys.exit()