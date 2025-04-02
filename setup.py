from setuptools import setup, find_packages

setup(
    name="cnt91-control",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "flask>=2.0.1",
        "pyvisa>=1.12.0",
        "requests>=2.26.0",
        "python-dotenv>=0.19.0",
    ],
    author="Tu Nombre",
    author_email="tu.email@ejemplo.com",
    description="Control remoto del dispositivo CNT-91 mediante GPIB",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    python_requires=">=3.8",
) 