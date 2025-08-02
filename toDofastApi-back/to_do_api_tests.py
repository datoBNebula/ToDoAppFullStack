import unittest
from test_db import client
from database import Base
from test_db import TestingSessionLocal
from models import Tasks


class CrudTests(unittest.TestCase):

    def setUp(self):
        db = TestingSessionLocal()
        db.query(Tasks).delete()
        db.commit()
        db.close()

    def test_post_status(self):
        response = client.post('/tasks/', json={'name': 'task1', 'description': 'description', 'difficulty': 'easy', 'status': 'to do'})
        self.assertEqual(response.status_code, 200)

    def test_post_response(self):
        response = client.post('tasks', json={'name': 'task2', 'description': 'description2', 'difficulty': 'medium', 'status': 'to do'})
        self.assertEqual(response.json(), {'name': 'task2', 'description': 'description2', 'difficulty': 'medium', 'status': 'to do', 'id': 1})

    def test_post_fail_status(self):
        response = client.post('tasks/', json={'name': 'task3', 'description': 'description3', 'difficulty': 'medium', 'status': 'unknown'})
        self.assertEqual(response.status_code, 422)
        self.assertNotEqual(response.json(), {'name': 'task3', 'description': 'description3', 'difficulty': 'medium', 'status': 'unknown'})

    def test_get_all_status(self):
        client.post('tasks/', json={'name': 'task3', 'description': 'description3', 'difficulty': 'medium',
                                               'status': 'to do'})
        client.post('tasks/', json={'name': 'task4', 'description': 'description4', 'difficulty': 'medium',
                                               'status': 'to do'})
        response = client.get('/tasks/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{'name': 'task3', 'description': 'description3', 'difficulty': 'medium', 'status': 'to do', 'id': 1},
                                           {'name': 'task4', 'description': 'description4', 'difficulty': 'medium', 'status': 'to do', 'id': 2}]
)
        self.assertEqual(len(response.json()), 2)


    def test_get_one_status(self):
        for i in range(5):
            task = {
                'name': f'task{i}',
                'description': f'description{i}',
                'difficulty': 'medium',
                'status': 'to do',
            }
            post_response = client.post('tasks/', json=task)
            self.assertEqual(post_response.status_code, 200)

            response = client.get(f'/tasks/{i+1}')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), {
                'name': f'task{i}',
                'description': f'description{i}',
                'difficulty': 'medium',
                'status': 'to do',
                'id': i+1
            })


    def test_put_status(self):
        for i in range(5):
            task = {
                'name': f'task{i}',
                'description': f'description{i}',
                'difficulty': 'medium',
                'status': 'to do',
            }
            post_response = client.post('tasks/', json=task)
            self.assertEqual(post_response.status_code, 200)
            task_id = post_response.json().get('id')

            put_response = client.put(f'/tasks/{task_id}', json={'name': f'task{i}', 'description': f' updated description {i}', 'difficulty': 'medium', 'status': 'to do'})
            self.assertEqual(put_response.status_code, 200)



    def test_delete_status(self):
        for i in range(5):
            task = {
                'name': f'task{i}',
                'description': f'description{i}',
                'difficulty': 'medium',
                'status': 'to do',
            }
            post_response = client.post('tasks/', json=task)
            self.assertEqual(post_response.status_code, 200)
            task_id = post_response.json().get('id')

            delete_response = client.delete(f'/tasks/{task_id}')
            self.assertEqual(delete_response.status_code, 200)

        get_response = client.get('/tasks/')
        self.assertEqual(get_response.status_code, 200)
        self.assertEqual(get_response.json(), [])


class LangChainTests(unittest.TestCase):
    pass








