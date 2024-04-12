import asyncio
import concurrent.futures
import queue
import sys


class BackgroundTaskService:
    def __init__(self, max_workers=5):
        self.executor = concurrent.futures.ThreadPoolExecutor(max_workers=max_workers)
        self.task_queue = queue.Queue()
        self.running = True

    def submit_task(self, task_func, *args, **kwargs):
        sys.stdout.write(f"Submitting task {task_func.__name__}\n")
        self.task_queue.put((task_func, args, kwargs))

    def run(self):
        sys.stdout.write("Background task service started\n")
        while self.running:
            try:
                task_func, args, kwargs = self.task_queue.get(timeout=1)
                self.executor.submit(self.__run_task__, task_func, *args, **kwargs)
            except queue.Empty:
                pass

    def __run_task__(self, task_func, *args, **kwargs):
        asyncio.run(task_func(*args, **kwargs))

    def stop(self):
        self.running = False
        self.executor.shutdown(wait=True)
        sys.stdout.write("Background task service stopped\n")
