<?php


namespace Tests\Feature\Api\Client;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_registers_a_new_user_and_returns_a_token()
    {
        \Spatie\Permission\Models\Role::create(['name' => 'client']);
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->postJson(route('client.register'), $userData);

        $response->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => $userData['email'],
        ]);

        $this->assertTrue(auth('api')->check());
    }

    /** @test */
    public function it_returns_an_error_if_the_request_data_is_invalid()
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];


        $response = $this->postJson(route('client.register'), $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'email',
            ]);

        $this->assertDatabaseMissing('users', [
            'email' => $userData['email'],
        ]);

        $this->assertFalse(auth('api')->check());
    }
}
