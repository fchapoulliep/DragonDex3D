import os

# for root, dirs, files in os.walk('./'):
#     for filename in files:
#         if filename.endswith('.glb') and filename.startswith('DBFZL_'):
#             print(filename)
#             new_filename = filename.replace('DBFZL_', '', 1)
#             os.rename(os.path.join(root, filename), os.path.join(root, new_filename))

# for root, dirs, files in os.walk('./'):
#     for dir_name in dirs:
#         if dir_name.startswith('Menu_Lobby_Avatar_'):
#             print(dir_name)
#             new_dir_name = dir_name.replace('Menu_Lobby_Avatar_', '', 1)
#             os.rename(os.path.join(root, dir_name), os.path.join(root, new_dir_name))
                        
# for root, dirs, files in os.walk('./'):
#     for dir_name in dirs:
#         if any(dir_name.startswith(f'Color{str(i).zfill(2)}') for i in range(1, 13)):
#             try:
#                 os.rmdir(os.path.join(root, dir_name))
#                 print(f"Deleted directory: {dir_name}")
#             except OSError as e:
#                 print(f"Error deleting directory {dir_name}: {e}")