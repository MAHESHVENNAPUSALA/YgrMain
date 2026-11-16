import re

def clean_employee_name(user=None, raw_name=None):
    """
    Authoritative, robust name cleanup function for employees.
    Ensures no duplicate surname, no duplicate words, trims whitespace,
    and returns a clean display name.
    """
    target = (raw_name or '').strip()
    if target:
        # Normalize internal whitespace
        target = re.sub(r'\s+', ' ', target)
        words = target.split(' ')
        # Remove trailing 'User' if it was a default placeholder
        if len(words) > 1 and words[-1].lower() == 'user':
            words = words[:-1]
            target = ' '.join(words)
        
        # Check compound concatenation e.g. ['maheshvennapusala', 'Vennapusala']
        if len(words) == 2 and words[0].lower().endswith(words[1].lower()) and len(words[0]) > len(words[1]):
            fn_part = words[0][:-len(words[1])].strip()
            return f"{fn_part.title()} {words[1].title()}".strip()

        # Check duplicated surname token at end e.g. ['Pathi', 'Gopi', 'Pathi']
        if len(words) >= 2 and words[0].lower() == words[-1].lower():
            return ' '.join(words[:-1])

        # If user object is provided, check if raw_name already has the surname
        # and doesn't have duplicate tokens
        tokens = [w.lower() for w in words]
        if len(tokens) == len(set(tokens)) and len(words) > 0:
            return target

    if user:
        fn = (user.first_name or '').strip()
        ln = (user.last_name or '').strip()
        fn = re.sub(r'\s+', ' ', fn)
        ln = re.sub(r'\s+', ' ', ln)

        if not fn and not ln:
            return user.username
        if not ln or ln.lower() == 'user':
            return fn or user.username
        if not fn:
            return ln

        # Check compound concatenation in first_name with last_name:
        # e.g. fn='maheshvennapusala', ln='Vennapusala'
        if fn.lower().endswith(ln.lower()) and len(fn) > len(ln):
            fn_part = fn[:-len(ln)].strip()
            if fn_part:
                return f"{fn_part.title()} {ln.title()}".strip()

        # e.g. fn starts with ln without space
        if fn.lower().startswith(ln.lower()) and len(fn) > len(ln):
            fn_part = fn[len(ln):].strip()
            if fn_part:
                return f"{ln.title()} {fn_part.title()}".strip()

        # Check if ln words already present in fn words
        fn_words = fn.split(' ')
        fn_lower = [w.lower() for w in fn_words]
        ln_words = ln.split(' ')
        ln_lower = [w.lower() for w in ln_words]

        if all(w in fn_lower for w in ln_lower):
            return fn
        if all(w in ln_lower for w in fn_lower):
            return ln

        return f"{fn} {ln}".strip()

    return target or 'Employee'


def get_clean_department(payslip):
    dept = (payslip.department or '').strip()
    if not dept and payslip.employee:
        dept = (payslip.employee.department or '').strip()

    from hr.models import User
    dept_map = dict(User.DEPARTMENT)
    if dept in dept_map:
        return dept_map[dept]
    if dept.lower() == 'technology':
        return 'Information Technology'
    return dept or 'Information Technology'


def get_clean_designation(payslip):
    desig = (payslip.designation or '').strip()
    if not desig and payslip.employee:
        desig = (payslip.employee.designation or '').strip()
    if not desig and payslip.employee:
        desig = (payslip.employee.role or '').strip()
    
    mapping = {
        'python_dev': 'Python Developer',
        'java_dev': 'Java Developer',
        'frontend_dev': 'Front-End Developer',
        'backend_dev': 'Back-End Developer',
        'fullstack_dev': 'Full Stack Developer',
        'testing': 'QA / Test Engineer',
        'devops': 'DevOps Engineer',
        'TeamLead': 'Team Lead',
        'Employee': 'Software Engineer',
    }
    return mapping.get(desig, desig or 'Staff')

