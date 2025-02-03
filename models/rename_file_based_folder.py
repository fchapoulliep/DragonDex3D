import os

for root, dirs, files in os.walk('./'):
    for dir_name in dirs:
        dir_path = os.path.join(root, dir_name)
        for file_name in os.listdir(dir_path):
            file_path = os.path.join(dir_path, file_name)
            if os.path.isfile(file_path):
                new_file_name = f"{dir_name}.glb"
                new_file_path = os.path.join(dir_path, new_file_name)
                os.rename(file_path, new_file_path)