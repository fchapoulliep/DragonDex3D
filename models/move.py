import os

for root, dirs, files in os.walk('./'):
    for dir_name in dirs:
        current_path = os.path.join(root, dir_name)
        new_path = os.path.join('.', dir_name)
        if os.path.abspath(current_path) != os.path.abspath(new_path):
            os.rename(current_path, new_path)