import sys
import tempfile
from pylint import epylint as lint

def analyze_code(code):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as temp_file:
        temp_file.write(code.encode())
        temp_file_path = temp_file.name
    
    (pylint_stdout, pylint_stderr) = lint.py_run(temp_file_path, return_std=True)
    return pylint_stdout.getvalue()

if __name__ == "__main__":
    code = sys.stdin.read()
    print(analyze_code(code))
