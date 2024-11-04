import sys
import tempfile
from pylint import epylint as lint
import subprocess
from guesslang import Guess

def analyze_code(code):
    guess = Guess()
    language = guess.language_name(code)
    
    if language == "Python":
        with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as temp_file:
            temp_file.write(code.encode())
            temp_file_path = temp_file.name
        
        (pylint_stdout, pylint_stderr) = lint.py_run(temp_file_path, return_std=True)
        lint_results = pylint_stdout.getvalue()
        
        run_results = subprocess.run(['python3', temp_file_path], capture_output=True, text=True)
        exec_results = run_results.stdout + run_results.stderr
        
        return lint_results + exec_results
    else:
        return "Unsupported language: " + language

if __name__ == "__main__":
    code = sys.stdin.read()
    print(analyze_code(code))
