import os
import json

SKIP_FOLDERS = ["tabbed", "jump-link"]


if __name__ == "__main__":
    # Gather all the components
    components = {}
    for folder in os.listdir("src/app/"):
        if folder not in SKIP_FOLDERS:
            path = os.path.join("src/app/", folder)
            if os.path.isdir(path):
                components[folder] = {}
                for root, dirs, files in os.walk(path):
                    for file in files:
                        with open(os.path.join(root, file), "r") as f:
                            contents = f.read()
                            if contents:
                                components[folder][file] = contents

    # Write the components to a single file
    with open("src/app/components.json", "w") as f:
        json.dump(components, f, indent=4)
